# server.py
import os
import io
import json
import base64
import asyncio
from concurrent.futures import ThreadPoolExecutor
from typing import Optional

import cv2
import numpy as np
import torch
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, HTMLResponse
from transformers import GPT2LMHeadModel, GPT2Tokenizer

# ----------------- CONFIG -----------------
DEBUG = os.getenv("DEBUG", "0") == "1"
WS_MAX_FRAME_BYTES = 1_200_000  # 1.2 MB (reject extremely large frames)
PROCESS_EVERY_N_FRAME = int(os.getenv("PROCESS_EVERY_N_FRAME", "3"))  # process 1 of N frames
THREAD_WORKERS = int(os.getenv("THREAD_WORKERS", "3"))
USE_DNN = os.getenv("USE_DNN", "1") == "1"
DNN_PROTO = os.getenv("DNN_PROTO", "deploy.prototxt")
DNN_MODEL = os.getenv("DNN_MODEL", "res10_300x300_ssd_iter_140000_fp16.caffemodel")
GPT2_DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
# ------------------------------------------

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

executor = ThreadPoolExecutor(max_workers=THREAD_WORKERS)


# ---------- load GPT-2 -----------
print("Loading GPT-2 tokenizer + model (may take a while)...")
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
gpt2_model = GPT2LMHeadModel.from_pretrained("gpt2").to(GPT2_DEVICE)
gpt2_model.eval()
print("GPT-2 loaded on", GPT2_DEVICE)


# ---------- load detectors ----------
dnn_net: Optional[cv2.dnn_Net] = None
haar_cascade: Optional[cv2.CascadeClassifier] = None


def try_load_dnn(proto_path: str, model_path: str) -> Optional[cv2.dnn_Net]:
    if not (os.path.exists(proto_path) and os.path.exists(model_path)):
        print("DNN model files not found at", proto_path, model_path)
        return None
    try:
        net = cv2.dnn.readNetFromCaffe(proto_path, model_path)
        # Optionally prefer CUDA backend if available (OpenCV must be built with CUDA)
        try:
            if cv2.cuda.getCudaEnabledDeviceCount() > 0:
                net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
                net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)
        except Exception:
            pass
        print("Loaded DNN detector.")
        return net
    except Exception as e:
        print("Failed to load DNN detector:", e)
        return None


def try_load_haar() -> Optional[cv2.CascadeClassifier]:
    path = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    cascade = cv2.CascadeClassifier(path)
    if cascade.empty():
        print("Failed to load Haar cascade from", path)
        return None
    print("Loaded Haar cascade fallback.")
    return cascade


if USE_DNN:
    dnn_net = try_load_dnn(DNN_PROTO, DNN_MODEL)
haar_cascade = try_load_haar()


# ------------ helpers --------------
def save_debug_image(img_bytes: bytes, name: str):
    if not DEBUG:
        return
    os.makedirs("debug_frames", exist_ok=True)
    path = os.path.join("debug_frames", f"{name}.jpg")
    try:
        with open(path, "wb") as f:
            f.write(img_bytes)
    except Exception as e:
        print("Failed to save debug image:", e)


def decode_image(data: bytes) -> Optional[np.ndarray]:
    """
    Accept:
      - raw jpeg bytes
      - dataURL text encoded as bytes (b"data:image/jpeg;base64,...")
    Return BGR np.ndarray or None
    """
    try:
        text = None
        if isinstance(data, (bytes, bytearray)):
            try:
                text = data.decode("utf-8")
            except Exception:
                text = None

        if text and text.startswith("data:"):
            # dataURL
            _, b64 = text.split(",", 1)
            imgdata = base64.b64decode(b64)
        else:
            imgdata = data

        arr = np.frombuffer(imgdata, dtype=np.uint8)
        img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
        return img
    except Exception as e:
        if DEBUG:
            print("decode_image error:", e)
        return None


def detect_face_dnn(img: np.ndarray, conf_threshold: float = 0.6) -> bool:
    h, w = img.shape[:2]
    blob = cv2.dnn.blobFromImage(cv2.resize(img, (300, 300)), 1.0, (300, 300),
                                 (104.0, 177.0, 123.0), False, False)
    dnn_net.setInput(blob)
    detections = dnn_net.forward()
    for i in range(detections.shape[2]):
        score = float(detections[0, 0, i, 2])
        if score > conf_threshold:
            return True
    return False


def detect_face_haar(img: np.ndarray) -> bool:
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)
    faces = haar_cascade.detectMultiScale(gray, scaleFactor=1.12, minNeighbors=4, minSize=(30, 30))
    return len(faces) > 0


def detect_face(img: np.ndarray) -> bool:
    if img is None:
        return False
    # quick resize to speed up detection
    max_dim = 900
    h, w = img.shape[:2]
    if max(h, w) > max_dim:
        scale = max_dim / float(max(h, w))
        img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)

    # DNN first (if available), then Haar
    if dnn_net is not None:
        try:
            if detect_face_dnn(img):
                return True
        except Exception as e:
            if DEBUG:
                print("DNN detect error:", e)
    if haar_cascade is not None:
        try:
            return detect_face_haar(img)
        except Exception as e:
            if DEBUG:
                print("Haar detect error:", e)
    return False


# --------------- roast generation (sync) ---------------
def sanitize_text_for_send(s: str) -> str:
    # remove control chars except newline/tab/carriage return
    return "".join(ch for ch in s if ("\t" == ch or "\n" == ch or "\r" == ch or ord(ch) >= 0x20))


# --- creative, safety-conscious Hinglish roast prompt (paste into your backend) ---
PROMPT_TEMPLATE = """You are a quick-witted Indian stand-up comedian who speaks in playful Hinglish (Hindi+English).
Your job: write a short, funny roast for a single person named {name}. Keep it clever, sharp, and emoji-friendly.
Tone: playful, witty, meme-style, light-savage — like a friendly roast among college friends or stand-up jokes.

RULES (must follow):
1. Keep it non-violent: no threats, no instructions to harm, no graphic content.
2. No hateful slurs or attacks against protected characteristics (religion, caste, gender, sexuality, race, disability).
3. No sexual content or explicit material.
4. No personal data, doxxing, or encouraging illegal acts.
5. Keep it short: ~1–3 punchlines/sentences. Use short Hindi-English mix phrases.
6. Use colloquial, relatable references (school, Wi-Fi, phone battery, memes) not personal insults about family or identity.
7. Optionally add one small emoji after the punchline.

Examples:
- "Bhai tera dimaag toh airplane mode mein atka hua — signal hi nahi aa raha. 😂"
- "Tu itna lazy hai ki alarm bhi bolta: 'Bhai, chhodo ise.'"
- "Teri profile picture dekhke lagta hai Photoshop ne holiday le liya. 😅"
- "Tu gym ke liye monthly subscription leta hai — lekin weight loss sirf wallet se hota hai."
- "Tera swag dekh ke mannequins bhi bol pade: 'Hum retire kar rahe hain.'"

Now write a roast for: {name}
"""
# ----------------------------

# Example integration inside generate_roast_sync:
def generate_roast_sync(name: str, max_len: int = 80) -> str:
    prompt = PROMPT_TEMPLATE.format(name=name)
    input_ids = tokenizer.encode(prompt, return_tensors="pt").to(GPT2_DEVICE)
    with torch.no_grad():
        outputs = gpt2_model.generate(
            input_ids,
            max_length=input_ids.shape[1] + max_len,
            num_return_sequences=1,
            do_sample=True,
            temperature=0.95,
            top_p=0.9,
            pad_token_id=tokenizer.eos_token_id,
        )
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    # return only the generated part after the prompt
    roast = text[len(prompt):].strip()
    # sanitize (remove control chars) before sending to client
    roast = sanitize_text_for_send(roast)
    return roast



# ---------------- WebSocket handler ----------------
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """
    Protocol:
    - Binary frames: raw JPEG bytes -> server decodes and may run detection
    - Text frames: JSON:
        {"type":"frame", "payload":"data:image/jpeg;base64,..."}  (optional)
        {"type":"command", "command":"roast", "name":"Shiv"}
    Server responses (text JSON):
        {"type":"detection","has_face":true}
        {"type":"roast","text":"..."}
        {"type":"info","message":"..."}
        {"type":"error","message":"..."}
    """
    await websocket.accept()
    client = websocket.client
    if DEBUG:
        print("WS connect:", client)

    frame_counter = 0
    busy_lock = asyncio.Lock()

    try:
        while True:
            msg = await websocket.receive()

            data_bytes = msg.get("bytes")
            data_text = msg.get("text")

            # ---------- binary frames path ----------
            if data_bytes:
                # security: guard size
                if len(data_bytes) > WS_MAX_FRAME_BYTES:
                    await websocket.send_text(json.dumps({"type": "error", "message": "Frame too large"}))
                    continue

                # optional: save for debug
                if DEBUG:
                    save_debug_image(data_bytes, f"ws_{frame_counter}")

                # decode image in executor
                img = await asyncio.get_event_loop().run_in_executor(executor, decode_image, data_bytes)

                frame_counter += 1
                if frame_counter % PROCESS_EVERY_N_FRAME != 0:
                    # quick ack to keep client happy
                    await websocket.send_text(json.dumps({"type": "frame_ack"}))
                    continue

                if busy_lock.locked():
                    await websocket.send_text(json.dumps({"type": "detection", "has_face": False, "skipped": True}))
                    continue

                async with busy_lock:
                    has_face = await asyncio.get_event_loop().run_in_executor(executor, detect_face, img)
                    await websocket.send_text(json.dumps({"type": "detection", "has_face": bool(has_face)}))
                continue

            # ---------- text frames path ----------
            if data_text:
                # parse JSON safely
                try:
                    payload = json.loads(data_text)
                except Exception:
                    await websocket.send_text(json.dumps({"type": "error", "message": "Invalid JSON"}))
                    continue

                ptype = payload.get("type")

                if ptype == "frame":
                    dataurl = payload.get("payload")
                    if not dataurl:
                        await websocket.send_text(json.dumps({"type": "error", "message": "Missing payload"}))
                        continue
                    # optional debug
                    if DEBUG:
                        save_debug_image(dataurl.encode("utf-8"), f"ws_frameurl_{frame_counter}")

                    img = await asyncio.get_event_loop().run_in_executor(executor, decode_image, dataurl.encode("utf-8"))

                    frame_counter += 1
                    if frame_counter % PROCESS_EVERY_N_FRAME != 0:
                        await websocket.send_text(json.dumps({"type": "frame_ack"}))
                        continue

                    if busy_lock.locked():
                        await websocket.send_text(json.dumps({"type": "detection", "has_face": False, "skipped": True}))
                        continue

                    async with busy_lock:
                        has_face = await asyncio.get_event_loop().run_in_executor(executor, detect_face, img)
                        await websocket.send_text(json.dumps({"type": "detection", "has_face": bool(has_face)}))
                    continue

                elif ptype == "command":
                    cmd = payload.get("command")
                    if cmd == "roast":
                        name = payload.get("name", "friend")
                        # Inform client, then generate roast in executor
                        await websocket.send_text(json.dumps({"type": "info", "message": "Generating roast... (may take a few seconds)"}))
                        roast_text = await asyncio.get_event_loop().run_in_executor(executor, generate_roast_sync, name)
                        # sanitize and send as UTF-8 JSON text
                        roast_text = sanitize_text_for_send(roast_text)
                        # primary send: ensure_ascii=False to preserve unicode
                        await websocket.send_text(json.dumps({"type": "roast", "text": roast_text}, ensure_ascii=False))
                        continue

                    else:
                        await websocket.send_text(json.dumps({"type": "error", "message": f"Unknown command {cmd}"}))
                        continue

                else:
                    await websocket.send_text(json.dumps({"type": "error", "message": "Unknown message type"}))
                    continue

    except WebSocketDisconnect:
        if DEBUG:
            print("WS disconnect:", client)
    except Exception as exc:
        if DEBUG:
            print("WS error:", exc)
        try:
            await websocket.close()
        except Exception:
            pass


# -------------- POST fallback for debug / non-ws clients ---------------
@app.post("/upload-frame")
async def upload_frame(file: UploadFile = File(...), name: str = "user"):
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Empty file")
    if len(content) > WS_MAX_FRAME_BYTES:
        raise HTTPException(status_code=413, detail="Frame too large")

    if DEBUG:
        save_debug_image(content, "upload_debug")

    # decode + detect in executor
    img = await asyncio.get_event_loop().run_in_executor(executor, decode_image, content)
    has_face = await asyncio.get_event_loop().run_in_executor(executor, detect_face, img)

    if has_face:
        roast_text = await asyncio.get_event_loop().run_in_executor(executor, generate_roast_sync, name)
        roast_text = sanitize_text_for_send(roast_text)
        return JSONResponse({"face_detected": True, "roast": roast_text})
    else:
        return JSONResponse({"face_detected": False, "roast": "Face not detected! Please center your face and try again."})


@app.get("/")
def index():
    return HTMLResponse("<h3>WebSocket roast backend running. Connect to /ws</h3>")

# server.py
# pip install fastapi uvicorn opencv-python
import asyncio
import cv2
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import logging

logging.basicConfig(level=logging.INFO)
app = FastAPI()

BOUNDARY = "--frame"

async def mjpeg_generator(source=0, width=640, height=360, fps=15, jpeg_quality=70):
    logging.info(f"Opening video source: {source}")
    cap = cv2.VideoCapture(source)
    if not cap.isOpened():
        logging.error("Cannot open video source")
        return

    cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)
    frame_interval = 1.0 / fps

    try:
        while True:
            start = asyncio.get_event_loop().time()
            ret, frame = cap.read()
            if not ret:
                await asyncio.sleep(frame_interval)
                continue

            frame = cv2.resize(frame, (width, height))
            success, jpeg = cv2.imencode('.jpg', frame, [int(cv2.IMWRITE_JPEG_QUALITY), jpeg_quality])
            if not success:
                await asyncio.sleep(frame_interval)
                continue
            jpg_bytes = jpeg.tobytes()

            header = (
                (BOUNDARY + "\r\n").encode() +
                b"Content-Type: image/jpeg\r\n" +
                f"Content-Length: {len(jpg_bytes)}\r\n\r\n".encode()
            )
            chunk = header + jpg_bytes + b"\r\n"

            yield chunk

            elapsed = asyncio.get_event_loop().time() - start
            await asyncio.sleep(max(0, frame_interval - elapsed))
    except asyncio.CancelledError:
        logging.info("mjpeg_generator cancelled")
    finally:
        cap.release()
        logging.info("capture released")


@app.get("/video")
async def video_endpoint():
    headers = {
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Content-Type": f"multipart/x-mixed-replace; boundary={BOUNDARY}"
    }
    return StreamingResponse(
        mjpeg_generator(source=0, width=640, height=360, fps=15, jpeg_quality=70),
        media_type=f"multipart/x-mixed-replace; boundary={BOUNDARY}",
        headers=headers
    )

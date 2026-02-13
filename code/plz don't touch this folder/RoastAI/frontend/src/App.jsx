import React, { useEffect, useRef, useState } from "react";

/**
 * Webcam → WebSocket client component
 *
 * Backend WS URL: ws://localhost:8000/ws (or wss://yourdomain/ws)
 *
 * Notes:
 * - Sends raw JPEG binary frames (ArrayBuffer) to server for fastest decode on backend.
 * - Server should implement the protocol described earlier: reply with JSON messages.
 */

const WS_URL = "ws://localhost:8000/ws"; // change to wss://... in production
const SEND_INTERVAL_MS = 250; // send one frame every N ms (adjust to lower CPU/network)
const JPEG_QUALITY = 0.6; // 0..1

export default function WebcamWsClient() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const wsRef = useRef(null);
  const sendTimerRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [name, setName] = useState("");
  const [roast, setRoast] = useState("");
  const [statusMsg, setStatusMsg] = useState("Not connected");
  const [faceDetected, setFaceDetected] = useState(false);
  const [loadingRoast, setLoadingRoast] = useState(false);
  const lastDetectionTsRef = useRef(0);

  // start camera
  useEffect(() => {
    let mounted = true;
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (!mounted) {
          // stop if component unmounted
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreamActive(true);
        setStatusMsg("Camera active");
      } catch (err) {
        console.error("getUserMedia error:", err);
        setStatusMsg("Camera error: " + (err.message || err.name));
        setStreamActive(false);
      }
    }
    startCamera();

    return () => {
      mounted = false;
      // stop camera
      try {
        const s = videoRef.current?.srcObject;
        if (s && s.getTracks) s.getTracks().forEach((t) => t.stop());
      } catch (e) {}
    };
  }, []);

  // connect websocket
  useEffect(() => {
    connectWs();

    return () => {
      cleanupWs();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when WS connected and camera active, start sending frames
  useEffect(() => {
    if (wsConnected && streamActive) startSendingFrames();
    else stopSendingFrames();

    return () => stopSendingFrames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsConnected, streamActive]);

  // helper: connect
  function connectWs() {
    if (
      wsRef.current &&
      (wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    setStatusMsg("Connecting websocket...");
    const ws = new WebSocket(WS_URL);
    ws.binaryType = "arraybuffer";

    ws.onopen = () => {
      console.log("WS open");
      wsRef.current = ws;
      setWsConnected(true);
      setStatusMsg("Connected to server");
      // reset reconnect
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
    };

    ws.onmessage = async (ev) => {
      try {
        // Normalize incoming data to a UTF-8 string (try multiple strategies)
        let rawText = null;

        if (typeof ev.data === "string") {
          rawText = ev.data;
        } else if (ev.data instanceof Blob) {
          // most browsers support blob.text()
          try {
            rawText = await ev.data.text();
          } catch (e) {
            // fallback: read as ArrayBuffer then decode
            const ab = await ev.data.arrayBuffer();
            rawText = new TextDecoder("utf-8", { fatal: false }).decode(
              new Uint8Array(ab)
            );
          }
        } else if (ev.data instanceof ArrayBuffer) {
          // decode array buffer (assume utf-8)
          rawText = new TextDecoder("utf-8", { fatal: false }).decode(
            new Uint8Array(ev.data)
          );
        } else {
          // last resort
          rawText = String(ev.data);
        }

        if (!rawText) return;

        // Try parse JSON
        let msg = null;
        try {
          msg = JSON.parse(rawText);
        } catch (err) {
          // If it's not JSON, try fallback decodings
          // Sometimes servers send bytes in latin1/utf-16le — try these heuristics:
          try {
            const arr = new Uint8Array(
              typeof ev.data === "object"
                ? ev.data
                : new TextEncoder().encode(rawText)
            );
            // Try latin1 -> string convert
            const latin1 = Array.from(arr)
              .map((b) => String.fromCharCode(b))
              .join("");
            try {
              msg = JSON.parse(latin1);
            } catch (e) {}
          } catch (e) {}
        }

        if (!msg) {
          console.warn(
            "WS: couldn't parse message as JSON. Raw preview:",
            rawText.slice ? rawText.slice(0, 200) : rawText
          );
          return;
        }

        // Handle roast_b64 if backend used base64 fallback
        if (msg.type === "roast_b64" && msg.text_b64) {
          try {
            const decoded = atob(msg.text_b64);
            // decoded is bytes in Latin1 space — convert to UTF-8 string
            // create uint8 array and decode as utf-8
            const bytes = new Uint8Array(
              decoded.split("").map((c) => c.charCodeAt(0))
            );
            const roastText = new TextDecoder("utf-8", { fatal: false }).decode(
              bytes
            );
            handleServerMessage({ type: "roast", text: roastText });
          } catch (e) {
            console.error("Failed to decode roast_b64", e);
          }
          return;
        }

        handleServerMessage(msg);
      } catch (err) {
        console.error("WS onmessage error:", err);
      }
    };

    ws.onerror = (e) => {
      console.error("WS error", e);
      setStatusMsg("WebSocket error");
    };

    ws.onclose = (e) => {
      console.log("WS closed", e);
      setWsConnected(false);
      setStatusMsg("WebSocket disconnected — reconnecting...");
      // try reconnect with backoff
      if (!reconnectTimerRef.current) {
        reconnectTimerRef.current = setTimeout(() => {
          reconnectTimerRef.current = null;
          connectWs();
        }, 1500);
      }
    };

    wsRef.current = ws;
  }

  function cleanupWs() {
    stopSendingFrames();
    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch (e) {}
      wsRef.current = null;
    }
    setWsConnected(false);
  }

  function sanitizeText(s) {
    if (!s) return "";
    return String(s).replace(/[^\t\n\r\u0020-\uFFFF]/g, "");
  }

  function handleServerMessage(msg) {
    if (!msg || !msg.type) return;
    if (msg.type === "detection") {
      const has = !!msg.has_face;
      setFaceDetected(has);
      lastDetectionTsRef.current = Date.now();
      setStatusMsg(has ? "Face detected" : "No face");
    } else if (msg.type === "roast") {
      setRoast(sanitizeText(msg.text || ""));
      setLoadingRoast(false);
    } else if (msg.type === "info") {
      setStatusMsg(String(msg.message || ""));
    } else if (msg.type === "error") {
      setStatusMsg("Server error: " + (msg.message || ""));
      setLoadingRoast(false);
    }
  }

  // Capture current video frame to canvas and return JPEG ArrayBuffer
  async function captureFrameAsArrayBuffer() {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return null; // HAVE_CURRENT_DATA
    const cw = video.videoWidth || 640;
    const ch = video.videoHeight || 480;

    const canvas = canvasRef.current || document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d");
    // draw video -> canvas
    ctx.drawImage(video, 0, 0, cw, ch);

    // optional: mirror for user-facing preview so it looks natural (but backend receives same mirrored data).
    // ctx.translate(cw, 0); ctx.scale(-1,1); ctx.drawImage(video, 0, 0, cw, ch);

    // convert to blob jpeg
    return await new Promise((resolve) => {
      canvas.toBlob(
        async (blob) => {
          if (!blob) return resolve(null);
          try {
            const arr = await blob.arrayBuffer();
            resolve(arr);
          } catch (e) {
            // fallback using FileReader if browser doesn't support arrayBuffer()
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.readAsArrayBuffer(blob);
          }
        },
        "image/jpeg",
        JPEG_QUALITY
      );
    });
  }

  // Frame sender loop
  async function sendOneFrameIfReady() {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    // if server told us it's busy and we want to skip when backend busy we could track that,
    // but here we just send at interval and backend can skip with "skipped":true response.
    const arr = await captureFrameAsArrayBuffer();
    if (!arr) return;
    try {
      ws.send(arr); // send raw JPEG bytes (ArrayBuffer)
    } catch (err) {
      console.warn("Failed to send frame:", err);
    }
  }

  function startSendingFrames() {
    if (sendTimerRef.current) return; // already running
    // create a hidden canvas reference if not present
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }
    sendTimerRef.current = setInterval(() => {
      // skip sending if ws not open
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
      // also avoid sending if tab isn't visible
      if (document.hidden) return;
      sendOneFrameIfReady();
    }, SEND_INTERVAL_MS);
    console.log("Started frame sender", SEND_INTERVAL_MS);
  }

  function stopSendingFrames() {
    if (sendTimerRef.current) {
      clearInterval(sendTimerRef.current);
      sendTimerRef.current = null;
      console.log("Stopped frame sender");
    }
  }

  // Request roast command
  async function requestRoast() {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setStatusMsg("WebSocket not connected");
      return;
    }
    if (!name.trim()) {
      alert("Enter your name first");
      return;
    }

    setLoadingRoast(true);
    setRoast("");
    try {
      const payload = { type: "command", command: "roast", name: name.trim() };
      wsRef.current.send(JSON.stringify(payload));
      setStatusMsg("Requested roast...");
    } catch (err) {
      console.error("Failed to send roast command", err);
      setLoadingRoast(false);
    }
  }

  // decide whether roast button should be enabled:
  // enable if faceDetected is true and detection was within last 4 seconds
  const canRoast =
    faceDetected &&
    Date.now() - lastDetectionTsRef.current < 4000 &&
    !loadingRoast &&
    wsConnected;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        background: "linear-gradient(180deg,#0f0f12,#14121a)",
        padding: 24,
        color: "#fff",
        fontFamily: "'Poppins', system-ui, Arial",
      }}
    >
      <h2 style={{ fontSize: 26, margin: 0 }}>
        🔥 Hinglish AI Roast (WebSocket) 🔥
      </h2>

      <div
        style={{
          display: "flex",
          gap: 28,
          alignItems: "flex-start",
          width: "100%",
          maxWidth: 980,
          justifyContent: "center",
        }}
      >
        {/* Webcam preview */}
        <div
          style={{
            width: 480,
            borderRadius: 12,
            background: "#0b0b0d",
            padding: 8,
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          <div style={{ position: "relative" }}>
            <video
              ref={videoRef}
              width="464"
              height="348"
              style={{
                borderRadius: 10,
                background: "#000",
                objectFit: "cover",
                display: "block",
              }}
              playsInline
              muted
            />
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 12,
                padding: "6px 10px",
                borderRadius: 999,
                background: faceDetected
                  ? "rgba(56, 189, 98, 0.18)"
                  : "rgba(255,255,255,0.06)",
                color: faceDetected ? "#38b862" : "#ddd",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              {faceDetected ? "Face detected" : "No face"}
            </div>
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 12,
                padding: "6px 10px",
                borderRadius: 999,
                background: "rgba(0,0,0,0.5)",
                color: "#fff",
                fontSize: 12,
              }}
            >
              {wsConnected ? "WS: connected" : "WS: disconnected"}
            </div>
          </div>
          <div style={{ marginTop: 8, fontSize: 13, color: "#bbb" }}>
            Status: {statusMsg}
          </div>
        </div>

        {/* Controls and output */}
        <div
          style={{
            flex: 1,
            maxWidth: 420,
            background: "rgba(255,255,255,0.03)",
            padding: 16,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.04)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
          }}
        >
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.04)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.04)",
                outline: "none",
              }}
            />
            <button
              onClick={requestRoast}
              disabled={!canRoast}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                border: "none",
                background: canRoast
                  ? "linear-gradient(90deg,#ff4b4b,#ff6b6b)"
                  : "rgba(255,80,80,0.2)",
                color: "#fff",
                cursor: canRoast ? "pointer" : "not-allowed",
                fontWeight: 700,
              }}
            >
              {loadingRoast ? "Roasting..." : "Roast Me"}
            </button>
          </div>

          <div style={{ marginBottom: 10, color: "#aaa", fontSize: 13 }}>
            Tip: Allow camera access, face should be centered. Frame sending
            interval: {SEND_INTERVAL_MS}ms
          </div>

          <textarea
            readOnly
            value={roast}
            placeholder="Your roast will appear here..."
            rows={10}
            style={{
              width: "100%",
              borderRadius: 10,
              padding: 12,
              background: "#fbfbfb",
              color: "#111",
              border: "none",
              boxShadow: "inset 0 3px 12px rgba(0,0,0,0.08)",
              resize: "vertical",
              fontSize: 14,
              lineHeight: 1.5,
            }}
          />
        </div>
      </div>
    </div>
  );
}

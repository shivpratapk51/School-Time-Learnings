// app.js
// Advanced chunked MJPEG client: fetch() the /video endpoint, parse multipart, draw JPEG frames to canvas
(() => {
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const urlInput = document.getElementById('url');
  const statusEl = document.getElementById('status');
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let controller = null; // AbortController for fetch
  let reader = null;

  function setStatus(text) {
    statusEl.textContent = text;
  }

  // Byte helpers
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  function concat(a, b) {
    const out = new Uint8Array(a.length + b.length);
    out.set(a, 0);
    out.set(b, a.length);
    return out;
  }

  function indexOfSequence(source, seq, from = 0) {
    for (let i = from; i <= source.length - seq.length; i++) {
      let match = true;
      for (let j = 0; j < seq.length; j++) {
        if (source[i + j] !== seq[j]) { match = false; break; }
      }
      if (match) return i;
    }
    return -1;
  }

  async function startStream(url) {
    controller = new AbortController();
    setStatus('Connecting...');
    try {
      const res = await fetch(url, { method: 'GET', cache: 'no-cache', signal: controller.signal });
      if (!res.ok || !res.body) {
        setStatus('Failed to connect: ' + res.status);
        return;
      }
      setStatus('Connected — streaming');
      reader = res.body.getReader();

      let buffer = new Uint8Array(0);
      // boundary must match backend (server.py used "--frame")
      const BOUNDARY = encoder.encode('--frame');
      const HEADER_END = encoder.encode('\r\n\r\n');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer = concat(buffer, value);

        // extract as many complete frames as possible
        while (true) {
          const boundaryIndex = indexOfSequence(buffer, BOUNDARY);
          if (boundaryIndex === -1) break;

          const headerEndIndex = indexOfSequence(buffer, HEADER_END, boundaryIndex);
          if (headerEndIndex === -1) break; // wait for full header

          const headerBytes = buffer.slice(boundaryIndex, headerEndIndex + HEADER_END.length);
          const headerText = decoder.decode(headerBytes);
          const m = headerText.match(/Content-Length:\s*(\d+)/i);
          let contentLength = null;
          if (m) contentLength = parseInt(m[1], 10);

          const jpgStart = headerEndIndex + HEADER_END.length;
          if (contentLength !== null) {
            if (buffer.length < jpgStart + contentLength) break; // wait for full jpeg
            const jpgBytes = buffer.slice(jpgStart, jpgStart + contentLength);
            const nextPos = jpgStart + contentLength;
            buffer = buffer.slice(nextPos);
            await renderFrame(jpgBytes);
            continue; // attempt to parse more in buffer
          } else {
            // fallback: find next boundary
            const nextBoundary = indexOfSequence(buffer, BOUNDARY, jpgStart);
            if (nextBoundary === -1) break;
            const jpgBytes = buffer.slice(jpgStart, nextBoundary);
            buffer = buffer.slice(nextBoundary);
            await renderFrame(jpgBytes);
            continue;
          }
        }
      }

      setStatus('Stream ended');
    } catch (err) {
      if (err.name === 'AbortError') {
        setStatus('Stopped');
      } else {
        console.error(err);
        setStatus('Error: ' + (err.message || err));
      }
    } finally {
      if (reader) {
        try { await reader.cancel(); } catch (e) {}
        reader = null;
      }
    }
  }

  async function renderFrame(jpgUint8) {
    try {
      const blob = new Blob([jpgUint8], { type: 'image/jpeg' });
      const img = await createImageBitmap(blob);
      if (canvas.width !== img.width || canvas.height !== img.height) {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      ctx.drawImage(img, 0, 0);
      img.close();
    } catch (err) {
      console.error('Render error', err);
    }
  }

  function stopStream() {
    if (controller) {
      controller.abort();
      controller = null;
    }
    setStatus('Stopped');
    stopBtn.disabled = true;
    startBtn.disabled = false;
  }

  startBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();
    if (!url) {
      setStatus('Please enter stream URL');
      return;
    }
    startBtn.disabled = true;
    stopBtn.disabled = false;
    startStream(url);
  });

  stopBtn.addEventListener('click', stopStream);

  // optional: auto-start on load (comment out if not desired)
  // window.addEventListener('load', () => startBtn.click());
})();
color3$$$$$
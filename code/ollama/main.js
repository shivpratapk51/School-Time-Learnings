// Simple client for calling a locally-running Ollama-compatible HTTP API
// Usage: `node main.js` (Node 18+ has native fetch). For older Node, install `node-fetch`.

const fetchImpl =
  globalThis.fetch ||
  ((...args) => import("node-fetch").then((m) => m.default(...args)));

const main = async (q, endpoint = "http://127.0.0.1:11434/api/chat") => {
  const body = {
    model: "deepcoder:1.5b",
    messages: [{ role: "user", content: q }],
  };

  const bodyStr = JSON.stringify(body);

  const headers = { "Content-Type": "application/json" };
  // Only set Content-Length in Node environments where Buffer is available.
  if (
    typeof Buffer !== "undefined" &&
    typeof process !== "undefined" &&
    process.versions &&
    process.versions.node
  ) {
    headers["Content-Length"] = Buffer.byteLength(bodyStr).toString();
  }

  try {
    const res = await fetchImpl(endpoint, {
      method: "POST",
      headers,
      body: bodyStr,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "<no body>");
      throw new Error(
        `Request failed ${res.status} ${res.statusText}: ${text}`
      );
    }

    // Try JSON, fall back to text
    let data;
    try {
      data = await res.json();
    } catch (_) {
      data = await res.text();
    }

    console.log("Response:", data);
    return data;
  } catch (error) {
    console.error("Error calling local model:", error);
    throw error;
  }
};

// Run with a test prompt. Change or call `main()` from other modules as needed.
if (require.main === module) {
  main("hiii").catch(() => process.exit(1));
}

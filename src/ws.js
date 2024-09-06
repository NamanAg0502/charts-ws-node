const { WebSocketServer } = require("ws");
const db = require("./db");

function setupWebSocket() {
  const wss = new WebSocketServer({ noServer: true });
  wss.on("connection", (ws) => {
    console.log("WebSocket connection established");
    db.query("LISTEN table_update");
    db.on("notification", (msg) => {
      const payload = JSON.parse(msg.payload);
      console.log("Notification received:", JSON.stringify(payload));
      ws.send(JSON.stringify(payload));
    });
    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });

  return wss;
}

module.exports = setupWebSocket;

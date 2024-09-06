const app = require("./app");
const setupWebSocket = require("./ws");
const http = require("http");

const server = http.createServer(app);
const wss = setupWebSocket();

server.listen(3000, () => {
  console.log("server is running on port: " + server.address().port);
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

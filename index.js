const express = require("express");
const pg = require("pg");
const { WebSocketServer } = require("ws");
const { join } = require("path");

const app = express();
const wss = new WebSocketServer({ noServer: true });

app.use(express.static(join(__dirname, "public")));
app.set("view engine", "ejs");

const client = new pg.Client({
  user: "naman",
  host: "localhost",
  database: "postgres",
  port: 5432,
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((err) => console.error("PostgreSQL connection error:", err));

wss.on("connection", (ws) => {
  console.log("WebSocket connection established");
  client.query("LISTEN table_update");
  client.on("notification", (msg) => {
    const payload = JSON.parse(msg.payload);
    console.log("Notification received:", payload);
    ws.send(JSON.stringify(payload));
  });
  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

app.get("/", async (req, res) => {
  try {
    const { rows } = await client.query(
      "SELECT * FROM nifty_data ORDER BY date DESC"
    );
    res.render("index", { data: rows });
  } catch (error) {
    console.error("Error fetching data from PostgreSQL:", error);
    res.status(500).send("Internal Server Error");
  }
});

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

module.exports = server;

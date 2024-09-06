const express = require("express");
const cors = require("cors");
const router = require("./routes");
const db = require("./db");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cors({ origin: "*" }));

db.connect()
  .then(() => console.log("connected to postgres database"))
  .catch((err) => console.error("PostgreSQL connection error:", err));

app.use(router);

module.exports = app;

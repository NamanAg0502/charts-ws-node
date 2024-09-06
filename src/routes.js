const express = require("express");
const db = require("./db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT DISTINCT on (date) * FROM nifty_data ORDER BY date DESC"
    );
    res.render("index", { data: rows });
  } catch (error) {
    console.error("Error fetching data from PostgreSQL:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/embedded", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT DISTINCT on (date) * FROM nifty_data ORDER BY date DESC"
    );
    res.json(rows);
  } catch (error) {
    res.send("Internal Server Error");
  }
});

module.exports = router;

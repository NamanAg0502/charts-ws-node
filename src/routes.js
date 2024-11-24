const express = require("express");
const db = require("./db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM public.nifty n ORDER BY 2 DESC"
    );
    console.log(rows);
    res.render("index", { data: rows });
  } catch (error) {
    console.error("Error fetching data from PostgreSQL:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/embedded", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM public.nifty n ORDER BY 2 DESC"
    );
    res.json(rows);
  } catch (error) {
    res.send("Internal Server Error");
  }
});

module.exports = router;

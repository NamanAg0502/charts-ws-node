const pg = require("pg");

const client = new pg.Client({
  user: "hive",
  host: "localhost",
  database: "recharts",
  password: "hive",
  port: 5432,
});

module.exports = client;

const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// Friendly root
app.get("/", (req, res) => {
  res.send("TaskTracker API is running. Try /healthz or /tasks.");
});

// DB config from env (same names you were using)
const {
  PGHOST = "db",
  PGUSER = "appuser",
  PGPASSWORD = "apppass",
  PGDATABASE = "appdb",
  PGPORT = "5432",
} = process.env;

const pool = new Pool({ host: PGHOST, user: PGUSER, password: PGPASSWORD, database: PGDATABASE, port: PGPORT });

app.get("/healthz", (req, res) => res.json({ ok: true }));

app.get("/tasks", async (req, res) => {
  const { rows } = await pool.query("SELECT id, title, done FROM tasks ORDER BY id");
  res.json(rows);
});

app.post("/tasks", async (req, res) => {
  const { title } = req.body || {};
  if (!title) return res.status(400).json({ error: "title required" });
  const { rows } = await pool.query(
    "INSERT INTO tasks (title, done) VALUES ($1, false) RETURNING id, title, done",
    [title]
  );
  res.status(201).json(rows[0]);
});

app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { done } = req.body || {};
  const { rows } = await pool.query(
    "UPDATE tasks SET done = COALESCE($1, done) WHERE id = $2 RETURNING id, title, done",
    [done, id]
  );
  if (!rows.length) return res.status(404).json({ error: "not found" });
  res.json(rows[0]);
});

module.exports = app;

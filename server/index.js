import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { projects, services, company } from "../shared/content.js";
import { connectDB } from "./db.js";
import { saveInquiry } from "./store.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;
const hits = new Map();

let useMongo = false;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || true,
  })
);
app.use(express.json({ limit: "40kb" }));

function limited(ip) {
  const now = Date.now();
  const slot = hits.get(ip) || [];
  const recent = slot.filter((time) => now - time < 10 * 60 * 1000);
  if (recent.length >= 8) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clean(value, max = 500) {
  return String(value || "").trim().slice(0, max);
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, company: company.legal, database: useMongo ? "mongodb" : "file" });
});

app.get("/api/projects", (req, res) => {
  const category = clean(req.query.category, 40);
  const list = category ? projects.filter((item) => item.category === category) : projects;
  res.json(list);
});

app.get("/api/projects/:slug", (req, res) => {
  const project = projects.find((item) => item.slug === req.params.slug);
  if (!project) return res.status(404).json({ error: "Project not found." });
  res.json(project);
});

app.get("/api/services", (_req, res) => {
  res.json(services);
});

app.post("/api/inquiries", async (req, res) => {
  const ip = req.ip || req.socket.remoteAddress || "local";
  if (limited(ip)) {
    return res.status(429).json({ error: "Too many requests. Please call us instead." });
  }

  const name = clean(req.body.name, 80);
  const phone = clean(req.body.phone, 30);
  const email = clean(req.body.email, 120);
  const city = clean(req.body.city, 60);
  const interest = clean(req.body.interest, 80);
  const message = clean(req.body.message, 2000);
  const source = clean(req.body.source, 40) || "contact";

  if (name.length < 2) return res.status(400).json({ error: "Please enter your name." });
  if (!/^[0-9+\-\s()]{10,20}$/.test(phone)) {
    return res.status(400).json({ error: "Please enter a valid phone number." });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    const saved = await saveInquiry(
      {
        name,
        phone,
        email,
        city,
        interest,
        message,
        source,
        estimate: req.body.estimate && typeof req.body.estimate === "object" ? req.body.estimate : null,
      },
      useMongo
    );
    res.status(201).json({ ok: true, id: saved._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not save your inquiry. Please call the office." });
  }
});

const clientDist = path.resolve(__dirname, "../client/dist");
app.use(express.static(clientDist));
app.get(/^(?!\/api).*/, (req, res, next) => {
  if (req.method !== "GET") return next();
  res.sendFile(path.join(clientDist, "index.html"), (error) => {
    if (error) next();
  });
});

const server = app.listen(PORT, async () => {
  useMongo = await connectDB();
  console.log(`Venora API listening on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the other process or set PORT in server/.env.`);
    process.exit(1);
  }
  throw error;
});

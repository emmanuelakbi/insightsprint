import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Route - Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// API Route - Log frontend errors to backend console
app.post("/api/log", (req, res) => {
  const { level, message, details } = req.body;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [FRONTEND_${level || 'INFO'}] ${message}`);
  if (details) {
    console.dir(details, { depth: null });
  }
  res.status(204).send();
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

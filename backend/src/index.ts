import { Hono } from "hono";
import { serve } from "bun";
import { authRoutes } from "./auth";

const app = new Hono();

app.get("/api/health", (c) => c.json({ ok: true, message: "Backend opérationnel 🚀" }));
app.route("/api/auth", authRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
serve({ fetch: app.fetch, port: PORT });
console.log(`Serveur fonctionnel sur le port ${PORT}`); 
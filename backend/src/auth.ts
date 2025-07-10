import { Hono } from "hono";
import { db } from "./db";
import { users } from "./schema";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const authRoutes = new Hono();

// Inscription
authRoutes.post("/register", async (c) => {
  const { email, password, username } = await c.req.json();
  if (!email || !password || !username) {
    return c.json({ error: "Email, nom d'utilisateur et mot de passe requis" }, 400);
  }
  const existing = await db.select().from(users).where(or(eq(users.email, email), eq(users.username, username)));
  if (existing.length > 0) {
    return c.json({ error: "Email ou nom d'utilisateur déjà utilisé" }, 400);
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const inserted = await db.insert(users).values({ email, passwordHash, username }).returning();
  const user = inserted[0];
  return c.json({ ok: true, user: { id: user.id, email: user.email, username: user.username } });
});

// Connexion
authRoutes.post("/login", async (c) => {
  const { email, password } = await c.req.json();
  if (!email || !password) {
    return c.json({ error: "Email et mot de passe requis" }, 400);
  }
  const found = await db.select().from(users).where(eq(users.email, email));
  if (found.length === 0) {
    return c.json({ error: "Utilisateur inconnu" }, 400);
  }
  const user = found[0];
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return c.json({ error: "Mot de passe incorrect" }, 400);
  }
  return c.json({ ok: true, user: { id: user.id, email: user.email, username: user.username } });
}); 
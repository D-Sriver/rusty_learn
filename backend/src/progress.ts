import { Hono } from "hono";
import { db } from "./db";
import { progress } from "./schema";
import { eq, and } from "drizzle-orm";

export const progressRoutes = new Hono();

progressRoutes.post("/save", async (c) => {
  const body = await c.req.json();
  console.log("BODY REÇU:", body); // AJOUTE CE LOG

  const { userId, chapitreKey, tempsPasse, dateValidation } = body;

  if (
    typeof userId !== "number" ||
    typeof chapitreKey !== "string" ||
    typeof tempsPasse !== "number"
  ) {
    return c.json({ error: "Champs invalides" }, 400);
  }

  // Correction ici :
  const dateValidationObj = dateValidation ? new Date(dateValidation) : null;

  // Vérifie si une ligne existe déjà
  const existing = await db
    .select()
    .from(progress)
    .where(and(eq(progress.userId, userId), eq(progress.chapitreKey, chapitreKey)));

  if (existing.length > 0) {
    // Met à jour la progression
    await db
      .update(progress)
      .set({
        tempsPasse,
        dateValidation: dateValidationObj,
      })
      .where(and(eq(progress.userId, userId), eq(progress.chapitreKey, chapitreKey)));
  } else {
    // Crée une nouvelle ligne
    await db.insert(progress).values({
      userId,
      chapitreKey,
      tempsPasse,
      dateValidation: dateValidationObj,
    });
  }

  return c.json({ ok: true });
});

// Récupérer la progression de l'utilisateur
progressRoutes.get("/:userId", async (c) => {
  const userId = Number(c.req.param("userId"));
  const data = await db
    .select()
    .from(progress)
    .where(eq(progress.userId, userId));
  return c.json(data);
});

progressRoutes.delete("/reset/:userId", async (c) => {
  const userId = Number(c.req.param("userId"));
  console.log("RESET demandé pour userId:", userId); // AJOUTE CE LOG
  if (!userId) return c.json({ error: "userId manquant" }, 400);
  await db.delete(progress).where(eq(progress.userId, userId));
  return c.json({ ok: true });
});

import { pgTable, serial, varchar, integer, timestamp, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 32 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  chapitreKey: varchar("chapitre_key", { length: 255 }).notNull(),
  tempsPasse: integer("temps_passe").default(0).notNull(),
  dateValidation: timestamp("date_validation"),
}, (table) => ({
  uniqueUserChapitre: unique().on(table.userId, table.chapitreKey)
}));
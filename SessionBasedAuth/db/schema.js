// db/schema.js
import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  salt: text().notNull(), // text() allows unlimited length, perfect for salts
});

export const userSession = pgTable("userSession",{
  id: uuid().primaryKey().defaultRandom(),
  userID: uuid().references(()=>usersTable.id).notNull(),
  createdAt: timestamp().defaultNow().notNull()
})
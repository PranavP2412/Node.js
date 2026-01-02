import { pgTable, serial, text, varchar, integer } from 'drizzle-orm/pg-core';

export const userTable = pgTable("users", {
  // 1. Add 'id' string here
  id: integer('id').primaryKey(),
  
  // 2. Add 'name' string here. The object { length: 255 } becomes the 2nd argument.
  name: varchar('name', { length: 255 }).notNull(),
  
  // 3. Add 'email' string here
  email: varchar('email', { length: 255 }).notNull().unique(),
});


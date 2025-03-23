import { cuid } from "@/lib/utils-server";
import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  uuid: uuid("uuid").defaultRandom().notNull().unique(),
  username: text("username"),
  email: text("email").notNull(),
  phone: text("phone"),
  first_name: text("first_name"),
  last_name: text("last_name"),
  profile_image: text("profile_image"),
  created_at: timestamp("created_at").default(sql`now()`),
  updated_at: timestamp("updated_at"),
  is_deleted: boolean("is_deleted").notNull().default(false),
});

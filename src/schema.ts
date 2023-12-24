import { relations, InferSelectModel } from "drizzle-orm"
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  username: varchar("username", { length: 256 }).notNull()
})

export type User = InferSelectModel<typeof users>

export const userRelations = relations(users, ({ one }) => ({
  account: one(accounts)
}))

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull()
})

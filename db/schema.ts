import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod"
import { z } from "zod";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
})

export const accountsRelation = relations(accounts, ({ many }) => {
  return {
    transactions: many(transactions),
  }
})

export const insertAccountSchema = createInsertSchema(accounts)

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  plaidId: text("plaid_id"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
})

export const categoriesRelation = relations(categories, ({ many }) => {
  return {
    transactions: many(transactions),
  }
})
export const insertCategorySchema = createInsertSchema(categories)

export const transactions = pgTable("transaction", {
  id: text("id").primaryKey(),
  amount: integer("amount").notNull(),
  payee: text("payee").notNull(),
  notes: text("notes"),
  date: timestamp("date", {mode: "date"}).notNull(),
  accountId: text("account_id").references(() => accounts.id, {
    onDelete: "cascade"
  }).notNull(),
  categoryId: text("categoryId").references(() => categories.id, {
    onDelete: "set null",
  })
})

export const transactionsRelations = relations(transactions, ({one}) => {
  return {
    account: one(accounts, {
      fields: [transactions.accountId],
      references: [accounts.id]
    }),
    category: one(categories, {
      fields: [transactions.categoryId],
      references: [categories.id]
    }),
  }
})

export const insertTransactionSchema = createInsertSchema(transactions, {
  date: z.coerce.date()
})

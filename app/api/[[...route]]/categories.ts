import { Hono } from "hono"
import { db } from "@/db/drizzle"
import { zValidator } from '@hono/zod-validator'
import { categories, insertCategorySchema } from "@/db/schema"
import { clerkMiddleware, getAuth } from "@hono/clerk-auth"
import { and, eq, inArray } from "drizzle-orm"
import { v4 as uuidv4 } from 'uuid';
import { z } from "zod"


const app = new Hono()
  .get("/",
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c)
      if (!auth?.userId){
        return c.json({error: "Unauthorized"}, 401)
      }
    const data = await db.select({
      id: categories.id,
      name: categories.name
    })
    .from(categories)
    .where(eq(categories.userId, auth.userId))
    
    return c.json({ data })
  })
  .get("/:id",
    clerkMiddleware(),
    zValidator("param",
      z.object({
        id: z.string().optional()
      })
    ),
    async (c) => {
      const auth = getAuth(c)
      const { id } = c.req.valid("param")

      if (!id) {
        return c.json({ error: "Missing id" }, 400)
      }
      if (!auth?.userId) {
        return c.json({error: "Unauthorized"}, 401)
      }
      const [data] = await db
        .select({
          id: categories.id,
          name: categories.name
        })
        .from(categories)
        .where(
          and(
            eq(categories.userId, auth.userId), 
            eq(categories.id, id)
          )
        )
      if (!data) {
        return c.json({ error: "Not found" }, 404)
      }
      return c.json({data}, 200)
    }
  )
  .post("/",
    clerkMiddleware(),
    zValidator("json", insertCategorySchema.pick({
      name:true,
    })),
    async (c) => {      
      const auth = getAuth(c)
      const values = c.req.valid("json")

      if (!auth?.userId){
        return c.json({error: "Unauthorized"}, 401)
      }
      
      const data = await db.insert(categories).values({
        id: uuidv4(),
        userId: auth.userId,
        ...values,
      });
      
      return c.json({ data })
    }
  )
  .post("/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async(c) => {
      const auth = getAuth(c)
      const values = c.req.valid("json")

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401)
      }

      const data = await db.delete(categories)
        .where(
          and(
            eq(categories.userId, auth.userId), 
            inArray(categories.id, values.ids)
          )
        )
        .returning({
          id: categories.id
        }
      )
      return c.json({ data }, 200)
    }
  )
  .patch("/:id",
    clerkMiddleware(),
    zValidator(
      "param", z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "json",
      insertCategorySchema.pick({
        name: true,
      })
    )
    ,
    async (c) => {
      const auth = getAuth(c)
      const { id } = c.req.valid("param")
      const values = c.req.valid("json")

      if (!id) {
        return c.json({ error: "Missing id" }, 400)
      }
      if (!auth?.userId) {
        return c.json({error: "Unauthorized"}, 401)
      }

      const [data] = await db
        .update(categories)
        .set(values)
        .where(
          and(
            eq(categories.userId, auth.userId),
            eq(categories.id, id)
          )
        )
        .returning()
      
      if (!data) {
        return c.json({ error: "Not found" }, 404)
      }
      return c.json(data)
    }
  )
  .delete("/:id",
    clerkMiddleware(),
    zValidator(
      "param", z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c)
      const { id } = c.req.valid("param")

      if (!id) {
        return c.json({ error: "Missing id" }, 400)
      }
      if (!auth?.userId) {
        return c.json({error: "Unauthorized"}, 401)
      }

      const [data] = await db
        .delete(categories)
        .where(
          and(
            eq(categories.userId, auth.userId),
            eq(categories.id, id)
          )
        )
        .returning({
          id: categories.id
        })
      
      if (!data) {
        return c.json({ error: "Not found" }, 404)
      }
      return c.json(data)
    }
  )

export default app
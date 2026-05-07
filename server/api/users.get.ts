import { db } from '../utils/db'
import { users } from '../db/schema'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Check if admin (for now, any logged in user can see this, but we should restrict later)
  const auth = event.context.auth
  if (!auth) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  // Fetch all users
  const allUsers = await db.select({
    id: users.id,
    username: users.username,
    email: users.email,
    createdAt: users.createdAt
  }).from(users).orderBy(desc(users.createdAt))

  return allUsers
})

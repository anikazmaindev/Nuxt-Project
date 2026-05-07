import { db } from '../../utils/db'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const auth = event.context.auth
  if (!auth) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const body = await readBody(event)
  const { username, email } = body

  if (!username || !email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username and email are required'
    })
  }

  try {
    const [updatedUser] = await db.update(users)
      .set({ username, email })
      .where(eq(users.id, auth.userId))
      .returning()

    if (!updatedUser) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Failed to update: User not found'
      })
    }

    return {
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email
      }
    }
  } catch (error: any) {
    if (error.code === '23505') {
      throw createError({
        statusCode: 409,
        statusMessage: 'Username or email already exists'
      })
    }
    throw error
  }
})

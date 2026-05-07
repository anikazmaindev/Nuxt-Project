import bcrypt from 'bcryptjs'
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
  const { currentPassword, newPassword } = body

  if (!currentPassword || !newPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Current and new passwords are required'
    })
  }

  // Get current user with password hash
  const [currentUser] = await db.select().from(users).where(eq(users.id, auth.userId))
  
  if (!currentUser) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }

  // Verify current password
  const isCorrect = await bcrypt.compare(currentPassword, currentUser.passwordHash)
  if (!isCorrect) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Incorrect current password'
    })
  }

  // Hash new password
  const newPasswordHash = await bcrypt.hash(newPassword, 10)

  // Update password
  await db.update(users)
    .set({ passwordHash: newPasswordHash })
    .where(eq(users.id, auth.userId))

  return {
    message: 'Password updated successfully'
  }
})

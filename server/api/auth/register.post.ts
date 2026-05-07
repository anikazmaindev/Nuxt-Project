import bcrypt from 'bcryptjs';
import { db } from '../../utils/db';
import { users } from '../../db/schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password } = body;

  if (!username || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const [insertedUser] = await db.insert(users).values({
      username,
      email,
      passwordHash,
    }).returning();

    if (!insertedUser) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal server error: Failed to create user',
      });
    }

    return {
      message: 'User registered successfully',
      user: {
        id: insertedUser.id,
        username: insertedUser.username,
        email: insertedUser.email,
      },
    };
  } catch (error: any) {
    if (error.code === '23505') {
      throw createError({
        statusCode: 409,
        statusMessage: 'Username or email already exists',
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});

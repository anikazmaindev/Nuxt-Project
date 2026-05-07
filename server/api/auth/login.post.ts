import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { db } from '../../utils/db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-at-least-32-chars-long');

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { username, password } = body;

    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Username and password are required',
      });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid username or password',
      });
    }

    const token = await new SignJWT({ userId: user.id, username: user.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('2h')
      .sign(JWT_SECRET);

    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 2, // 2 hours
      path: '/',
    });

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal server error',
      data: error.message,
    });
  }
});

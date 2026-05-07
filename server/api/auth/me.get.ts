import { jwtVerify } from 'jose';
import { db } from '../../utils/db';
import { users } from '../../db/schema';
import { eq } from 'drizzle-orm';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-at-least-32-chars-long');

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');

  if (!token) {
    return { user: null };
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Fetch full user info from DB to ensure email is present
    const [dbUser] = await db.select().from(users).where(eq(users.id, payload.userId as number));

    if (!dbUser) return { user: null };

    return {
      user: {
        id: dbUser.id,
        username: dbUser.username,
        email: dbUser.email,
      },
    };
  } catch (error) {
    return { user: null };
  }
});

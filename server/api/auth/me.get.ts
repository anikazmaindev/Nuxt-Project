import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-at-least-32-chars-long');

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');

  if (!token) {
    return { user: null };
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      user: {
        id: payload.userId,
        username: payload.username,
      },
    };
  } catch (error) {
    return { user: null };
  }
});

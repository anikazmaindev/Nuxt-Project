import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-at-least-32-chars-long');

export default defineEventHandler(async (event) => {
  const path = getRequestPath(event);

  // Only protect dashboard routes and specific API routes
  if (path.startsWith('/dashboard') || (path.startsWith('/api/') && !path.startsWith('/api/auth/'))) {
    const token = getCookie(event, 'auth_token');

    if (!token) {
      if (path.startsWith('/api/')) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Unauthorized',
        });
      } else {
        return sendRedirect(event, '/login');
      }
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      event.context.auth = {
        userId: payload.userId,
        username: payload.username,
      };
    } catch (error) {
      if (path.startsWith('/api/')) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Unauthorized',
        });
      } else {
        return sendRedirect(event, '/login');
      }
    }
  }
});

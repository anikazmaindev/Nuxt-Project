import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key-at-least-32-chars-long');

export default defineEventHandler(async (event) => {
  const path = getRequestPath(event);

  // Protect dashboard routes and sensitive API routes
  // Public routes that don't need auth
  const isPublicApi = (path === '/api/posts' || path.startsWith('/api/posts/')) && event.method === 'GET'
  const isAuthRoute = path.startsWith('/api/auth/login') || path.startsWith('/api/auth/register') || path.startsWith('/api/auth/me')
  
  if (path.startsWith('/dashboard') || (path.startsWith('/api/') && !isAuthRoute && !isPublicApi)) {
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

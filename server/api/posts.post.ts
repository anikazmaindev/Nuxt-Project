import { db } from '../utils/db';
import { posts } from '../db/schema';

export default defineEventHandler(async (event) => {
  // Authentication is handled by server/middleware/auth.ts
  // The user info is available in event.context.auth
  const auth = event.context.auth;

  if (!auth) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  const body = await readBody(event);
  const { title, description, image } = body;

  if (!title || !description) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title and description are required',
    });
  }

  try {
    const [newPost] = await db.insert(posts).values({
      title,
      description,
      image,
      authorId: auth.userId,
    }).returning();

    return {
      message: 'Post created successfully',
      post: newPost,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error: Failed to create post',
      data: error.message,
    });
  }
});

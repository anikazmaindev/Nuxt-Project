import { db } from '../../utils/db';
import { posts } from '../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Post ID is required' });

  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, parseInt(id)),
      with: { author: true }
    });

    if (!post) throw createError({ statusCode: 404, statusMessage: 'Post not found' });

    return post;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch post',
    });
  }
});

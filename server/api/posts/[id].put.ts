import { db } from '../../utils/db';
import { posts } from '../../db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Post ID is required' });

  const auth = event.context.auth;
  if (!auth) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

  const body = await readBody(event);
  const { title, description, image } = body;

  try {
    const [updatedPost] = await db.update(posts)
      .set({ title, description, image })
      .where(eq(posts.id, parseInt(id)))
      .returning();

    if (!updatedPost) throw createError({ statusCode: 404, statusMessage: 'Post not found' });

    return {
      message: 'Post updated successfully',
      post: updatedPost,
    };
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to update post',
    });
  }
});

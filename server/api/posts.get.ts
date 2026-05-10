import { db } from '../utils/db';
import { posts } from '../db/schema';
import { desc, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const limit = query.limit ? parseInt(query.limit as string) : undefined;
    const isRandom = query.random === 'true';

    const allPosts = await db.query.posts.findMany({
      orderBy: isRandom ? [sql`RANDOM()`] : [desc(posts.createdAt)],
      limit: limit,
      with: {
        author: true,
      }
    });

    return allPosts;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch posts',
      data: error.message,
    });
  }
});

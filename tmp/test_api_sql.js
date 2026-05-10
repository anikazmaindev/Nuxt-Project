
import postgres from 'postgres';

const DATABASE_URL = "postgresql://netlifydb_owner:npg_fBj1bt8OiMoS@ep-bold-glitter-ajz22b5i.c-3.us-east-2.db.netlify.com/netlifydb?sslmode=require";

async function testApi() {
  const sql = postgres(DATABASE_URL);
  try {
    const latest = await sql`SELECT * FROM posts ORDER BY created_at DESC LIMIT 6`;
    console.log('Latest posts:', latest.length);
    
    const random = await sql`SELECT * FROM posts ORDER BY RANDOM() LIMIT 4`;
    console.log('Random posts:', random.length);
  } catch (error) {
    console.error('Error testing SQL:', error);
  } finally {
    await sql.end();
  }
}

testApi();

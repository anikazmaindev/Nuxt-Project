
import postgres from 'postgres';
import bcrypt from 'bcryptjs';

const DATABASE_URL = "postgresql://netlifydb_owner:npg_fBj1bt8OiMoS@ep-bold-glitter-ajz22b5i.c-3.us-east-2.db.netlify.com/netlifydb?sslmode=require";
const NEW_PASSWORD = "123456";
const USERNAME = "Anik";

async function resetPassword() {
  const sql = postgres(DATABASE_URL);
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(NEW_PASSWORD, salt);
    
    const result = await sql`UPDATE users SET password_hash = ${hash} WHERE username = ${USERNAME} RETURNING username`;
    
    if (result.length > 0) {
      console.log(`Password for user ${USERNAME} updated successfully.`);
    } else {
      console.log(`User ${USERNAME} not found.`);
    }
  } catch (error) {
    console.error('Error resetting password:', error);
  } finally {
    await sql.end();
  }
}

resetPassword();

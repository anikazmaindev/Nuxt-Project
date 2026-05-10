import 'dotenv/config';
import { db } from '../utils/db';
import { users, posts } from './schema';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Seeding database...');

  // 1. Create default user
  const hashedPassword = await bcrypt.hash('123456', 10);
  
  console.log('Creating user Anik...');
  const [adminUser] = await db.insert(users).values({
    username: 'Anik',
    email: 'anik@example.com',
    passwordHash: hashedPassword,
  }).onConflictDoUpdate({
    target: users.username,
    set: { passwordHash: hashedPassword }
  }).returning();

  if (!adminUser) {
    throw new Error('Failed to create or update admin user');
  }

  console.log('Seeding posts...');
  const samplePosts = [
    {
      title: 'Getting Started with Nuxt 3',
      description: 'Nuxt 3 is a powerful framework for building modern web applications. In this post, we explore its key features and how to get started.',
      image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop',
      authorId: adminUser.id,
    },
    {
      title: 'The Future of Web Development',
      description: 'Web development is evolving rapidly. From AI-driven code generation to new frontend frameworks, the future looks exciting.',
      image: 'https://images.unsplash.com/photo-1451187530270-91a974ea8476?q=80&w=1000&auto=format&fit=crop',
      authorId: adminUser.id,
    },
    {
      title: 'Mastering Tailwind CSS',
      description: 'Tailwind CSS has changed how we think about styling. Learn how to build beautiful, responsive interfaces with utility classes.',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop',
      authorId: adminUser.id,
    }
  ];

  for (const post of samplePosts) {
    await db.insert(posts).values(post);
  }

  console.log('✅ Seeding completed!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});

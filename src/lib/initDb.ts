import { prisma } from '@/lib/db';

export async function initializeDb() {
  try {
    // Check if any prompts exist
    const count = await prisma.prompt.count();
    if (count === 0) {
      console.log('Database is empty. Ready to add prompts.');
    }
    return true;
  } catch (error) {
    console.error('Database initialization error:', error);
    return false;
  }
}

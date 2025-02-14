import { PrismaClient } from '@prisma/client';
import rssFeeds from '@/app/data/blackAmericanData';

const prisma = new PrismaClient();

async function migrateFeeds() {
  console.log('🚀 Starting RSS Feed migration...');

  for (const feed of rssFeeds) {
    try {
      await prisma.rSSFeed.upsert({
        where: { url: feed.url },
        update: {}, // No need to update, just ensure uniqueness
        create: {
          name: feed.name,
          url: feed.url,
          purpose: feed.purpose,
          logoSmall: feed.logo,  // Updated field name
          logoLarge: feed.logo2, // Updated field name
          active: true,
          region: "USA", // Default region for now
        },
      });
      console.log(`✅ Added: ${feed.name}`);
    } catch (error) {
      console.error(`❌ Error adding ${feed.name}:`, error);
    }
  }

  console.log('🎉 Migration complete!');
  await prisma.$disconnect();
}

migrateFeeds();
// app/utils/saveArticleToDatabase.ts

import { PrismaClient } from '@prisma/client';
import { logInfo, logError } from '@/app/utils/logger';

const prisma = new PrismaClient();

// Hardcoded system user ID for automated RSS imports
if (!process.env.SYSTEM_USER_ID) {
    throw new Error("SYSTEM_USER_ID is not defined in the environment variables.");
}
  
const SYSTEM_USER_ID = process.env.SYSTEM_USER_ID;

/**
 * Saves an article to the database.
 * - If the article doesn't exist, it creates a new entry.
 * - If the article exists, it links it to the user.
 * 
 * @param article - The article data to be saved.
 * @param userId - The ID of the user saving the article (defaults to system user for RSS imports).
 */
export async function saveArticleToDatabase(article: {
  title: string;
  date: Date;
  link: string;
  summary: string;
  imageURL?: string | null;
  author?: string | null;
  source: string;
  category?: string | null;
  region?: string | null;
}, userId: string = SYSTEM_USER_ID): Promise<void> {
  
  try {
    // logInfo(`🔍 Checking if article in database: ${article.link}`);

    // Check if the article already exists in the database
    let savedArticle = await prisma.savedArticle.findUnique({
      where: { link: article.link },
    });

    if (!savedArticle) {
      // logInfo(`🆕 Article not in database, creating new entry: ${article.title}`);
      logInfo(`🆕 Article not in database, creating new entry:`);

      // Create a new article entry
      savedArticle = await prisma.savedArticle.create({
        data: {
          title: article.title,
          date: article.date,
          link: article.link,
          summary: article.summary,
          imageURL: article.imageURL || null,
          author: article.author || null,
          source: article.source,
          category: article.category || null,
          region: article.region || null,
        },
      });

      //logInfo(`✅ Article saved in database: ${article.title}`);
      logInfo(`✅ Article successfully saved to database: `);
      
    }

    logInfo(`🔗 Linking article to user: ${userId}`);

    // Check if the user has already saved this article
    const userSavedArticle = await prisma.userSavedArticle.findFirst({
      where: {
        userId: userId,
        articleId: savedArticle.id,
      },
    });

    if (!userSavedArticle) {
      // Link the article to the user
      await prisma.userSavedArticle.create({
        data: {
          userId: userId,
          articleId: savedArticle.id,
        },
      });

      logInfo(`✅ Article linked to user successfully.`);
      logInfo("        "); // 🔍 Separates each article for better readability
    } else {
      logInfo(`⚠️ Article already saved by user.`);
    }

  } catch (error) {
    logError(`❌ Error saving article to database: ${(error as Error).message}`);
  }
}
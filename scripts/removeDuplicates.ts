// removes any duplicate articles from the database.

import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const uri = process.env.DATABASE_URL as string;

async function removeDuplicateArticles() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('🔍 Connected to MongoDB. Starting duplicate removal process...');

    const database = client.db(); // Automatically picks the database from the connection string
    const collection = database.collection('SavedArticle');

    // Find duplicate articles based on author, title, and summary
    const duplicates = await collection.aggregate([
      {
        $group: {
          _id: { author: '$author', title: '$title', summary: '$summary' },
          count: { $sum: 1 },
          ids: { $push: '$_id' }
        }
      },
      {
        $match: { count: { $gt: 1 } }
      }
    ]).toArray();

    if (duplicates.length === 0) {
      console.log('✅ No duplicates found.');
      return;
    }

    console.log(`🚫 Found ${duplicates.length} duplicate groups. Removing extra entries...`);

    // Remove all but one instance of each duplicate
    for (const duplicate of duplicates) {
      const duplicateIds = duplicate.ids;

      // Keep the first document, delete the rest
      const idsToDelete = duplicateIds.slice(1);
      for (const id of idsToDelete) {
        await collection.deleteOne({ _id: new ObjectId(id) });
        console.log(`🗑️ Deleted duplicate article with ID: ${id}`);
      }
    }

    console.log('✅ Duplicate removal process completed.');

  } catch (error) {
    console.error('❌ Error removing duplicates:', error);
  } finally {
    await client.close();
    console.log('🔒 Connection to MongoDB closed.');
  }
}

// Run the script
removeDuplicateArticles();
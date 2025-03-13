// connects to MongoDB and updates every document in the SavedArticle
// collection by setting its summary field to an empty string.

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const uri = process.env.DATABASE_URL as string;

async function clearSummaryField() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('🔍 Connected to MongoDB. Starting summary clearing process...');

    const database = client.db(); // Uses the database specified in your connection string
    const collection = database.collection('SavedArticle');

    // Fetch all documents from the collection
    const cursor = collection.find({});
    let modifiedCount = 0;

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      if (!doc) continue;  // Add this check to ensure 'doc' is not null
      const newSummary = `CLEARED_${doc._id}`;
      const result = await collection.updateOne(
        { _id: doc._id },
        { $set: { summary: newSummary } }
      );
      if (result.modifiedCount > 0) {
        modifiedCount++;
        console.log(`✅ Updated document ${doc._id} summary to "${newSummary}"`);
      }
    }

    console.log(`✅ Successfully updated ${modifiedCount} documents to clear the summary field.`);
  } catch (error) {
    console.error('❌ Error updating summary field:', error);
  } finally {
    await client.close();
    console.log('🔒 Connection to MongoDB closed.');
  }
}

// Run the script
clearSummaryField();
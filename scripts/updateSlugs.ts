import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateSlugs() {
  console.log("Fetching articles with invalid slugs...");

  const articles = await prisma.savedArticle.findMany({
    where: {
      slug: {
        contains: "&", // Only fetch articles with slugs that need fixing
      },
    },
  });

  if (articles.length === 0) {
    console.log("No slugs need updates.");
    return;
  }

  console.log(`Found ${articles.length} articles with invalid slugs.`);

  let updatedCount = 0;

  for (const article of articles) {
    // Generate a cleaned-up slug
    const slug = (article.slug || "") // Ensure it's a string
  .toLowerCase()
  .replace(/&/g, "and") // Convert "&" to "and"
  .replace(/[^a-z0-9]+/g, "-") // Replace special characters and spaces with "-"
  .replace(/^-+|-+$/g, ""); // Trim leading/trailing dashes

    try {
      await prisma.savedArticle.update({
        where: { id: article.id },
        data: { slug },
      });

      updatedCount++;
      console.log(`Updated slug for: "${article.title}" → ${slug}`);
    } catch (error) {
      console.error(`Error updating slug for "${article.title}":`, error);
    }
  }

  console.log(`Finished updating slugs. Total updated: ${updatedCount}`);

  await prisma.$disconnect();
}

updateSlugs().catch((error) => {
  console.error("Error running slug update script:", error);
  prisma.$disconnect();
});
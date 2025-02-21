


import "dotenv/config";
import { categorizeArticle } from "./categorizeArticle";

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function categorizeWithRetry(title: string, summary: string, retries = 3): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await categorizeArticle(title, summary);
    } catch (error: any) {
      if (attempt === retries || ![503, 500].includes(error.response?.status)) {
        throw error;
      }
      console.warn(`⚠️ Attempt ${attempt} failed. Retrying in 5 seconds...`);
      await delay(5000); // Wait 5 seconds before retrying
    }
  }
  throw new Error("All retry attempts failed.");
}

async function testCategorization() {
  console.log("🚀 Running categorization test...");

  let totalArticles = 0;
  let totalCorrect = 0;
  let totalIncorrect = 0;

  const testCases = [
    {
      title: "Kendrick Lamar Repped For The Culture & Kept His Foot On Necks At The Super Bowl LIX Halftime Show",
      summary: "Kendrick Lamar further fanned the flames of his Drake beef and made a very Black artistic statement during his Super Bowl LIX Halftime Show.",
      expectedCategory: "Music & Film"
    },
    {
      title: "Wi-Fi Hotspot Name Sparks Bomb Scare On American Airlines Flight",
      summary: "American Airlines Flight 2863 from Austin, Texas, to Charlotte, North Carolina, was delayed four and a half hours on February 7 after someone’s personal hotspot caused a bomb scare.",
      expectedCategory: "Travel & Food"
    },
    {
      title: "Youth Leadership Trainer Introduces African Leaders to Inspire the Next Generation",
      summary: "Lucie S. Matsouaka, an internationally recognized youth leadership trainer, author, and human rights consultant, launches her latest book to inspire African leaders.",
      expectedCategory: "Education"
    },
    {
      title: "What to Expect for High-Yield Savings Accounts in 2025",
      summary: "The higher the interest rate for your savings account, the more money you earn. Experts predict trends for 2025.",
      expectedCategory: "Business & Finance"
    },
    {
      title: "20 Million Predatory Loans Drained Over $2.4 Billion from Consumers",
      summary: "Predatory lending drained more than $2.4 billion from low-income borrowers in just one year, highlighting systemic financial issues.",
      expectedCategory: "Business & Finance"
    },
    {
      title: "Mayor Eric Adams will face judge who will decide whether to dismiss his criminal case",
      summary: "Mayor Eric Adams faces a federal judge who will decide whether to grant the Justice Department's request to dismiss corruption charges.",
      expectedCategory: "Politics & Law"
    },
    {
      title: "Meet TikTok’s 2025 Black Voices to Watch",
      summary: "For Black History Month 2025, TikTok highlights Black content creators making waves through their dynamic creativity and entrepreneurship.",
      expectedCategory: "Pop Culture & Celebrities"
    },
    {
      title: "Courtney Mays On Style & Size Diversity In The WNBA",
      summary: "Highlighting women in sports and their influence on the global fashion industry, Courtney Mays discusses style diversity in the WNBA.",
      expectedCategory: "Sports"
    },
    {
      title: "Beyoncé Drops Latest Perfume As Fans Still Recover From Pricey ‘Cowboy Carter’ Tour Tickets",
      summary: "Beyoncé launches her latest perfume, Cé Lumière, amid fan frustrations over expensive tour tickets.",
      expectedCategory: "Pop Culture & Celebrities"
    },
    {
      title: "Brutal body cam footage shows beating of Robert L. Brooks in handcuffs one day before death",
      summary: "Body cam footage reveals Robert L. Brooks was beaten by officers at Marcy Correctional Facility hours before his death.",
      expectedCategory: "Politics & Law"
    },
    {
      title: "Ballet After Dark hosts holiday dinner",
      summary: "Baltimore nonprofit Ballet After Dark uses dance to address trauma, hosting a holiday dinner and announcing a major grant.",
      expectedCategory: "Health & Wellness"
    },
    {
      title: "FPL Brings Energy-Saving Solutions to Little Haiti",
      summary: "Florida Power & Light Company hosts an event at the Little Haiti Cultural Complex to promote energy-saving solutions.",
      expectedCategory: "Science & Technology"
    },
    {
      title: "Vice President Harris certifies 2024 election results on anniversary of Jan. 6 Capitol riot",
      summary: "Vice President Kamala Harris confirmed Donald Trump as the next U.S. president, marking the anniversary of the Capitol riot.",
      expectedCategory: "Politics & Law"
    },
    {
      title: "Two Black Women Make History in the U.S. Senate",
      summary: "Lisa Blunt Rochester and Angela Alsobrooks were sworn in as U.S. Senators by Vice President Kamala Harris, making history.",
      expectedCategory: "Politics & Law"
    },
    {
      title: "Annual MLK Holiday Prayer Breakfast takes place in nation’s capital",
      summary: "The MLK Prayer Breakfast honored Dr. Martin Luther King Jr.'s legacy, recognizing community leaders and youth for their contributions.",
      expectedCategory: "Politics & Law"
    }
  ];

  for (const { title, summary, expectedCategory } of testCases) {
    try {
      totalArticles++;
      console.log("--------------------------------------------------");
      console.log(`📝 Title: ${title}`);

      const category = await categorizeWithRetry(title, summary);
      console.log(`📝 Expected Category: ${expectedCategory}`);
      console.log(`✅ Assigned Category: ${category}`);

      if (category === expectedCategory) {
        totalCorrect++;
        console.log(`🔎 Match: ✅ Correct`);
      } else {
        totalIncorrect++;
        console.log(`🔎 Match: ❌ Incorrect`);
      }
      console.log("--------------------------------------------------\n");

      await delay(1000); // 1-second delay to prevent rate limiting

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`❌ Error categorizing article: ${error.message}`);
      } else {
        console.error("❌ Unknown error occurred during categorization");
      }
    }
  } 

  const accuracyRate = ((totalCorrect / totalArticles) * 100).toFixed(2);
  console.log("============== 📊 TEST SUMMARY 📊 ==============");
  console.log(`📝 Total Articles Categorized: ${totalArticles}`);
  console.log(`✅ Total Correct: ${totalCorrect}`);
  console.log(`❌ Total Incorrect: ${totalIncorrect}`);
  console.log(`📈 Accuracy Rate: ${accuracyRate}%`);
  console.log("===============================================");
}

// ✅ Run the test
testCategorization();
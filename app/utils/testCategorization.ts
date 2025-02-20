import "dotenv/config"; // ✅ Ensures the .env file is loaded
import { categorizeArticle } from "./categorizeArticle"; // ✅ Import the categorization function

async function testCategorization() {
  console.log("🚀 Running categorization test...");

  // ✅ Reordered test cases: The consistently correct ones are first, and problematic ones are last.
  const testCases = [
    {
      title: "L.A. Jury Finds ASAP Rocky Not Guilty in Felony Assault Case",
      summary: "The verdict is in: Rakim Mayers, known to music fans around the world as ASAP Rocky, has been found not guilty on two felony counts of assault.",
      expectedCategory: "Pop Culture & Celebrities"
    },
    {
      title: "Footage Shows Delta Crash Landing in Toronto",
      summary: "Footage has emerged of a fiery plane crash at Toronto's Pearson airport, showing a Delta Air Lines jet skidding along the runway and flipping over.",
      expectedCategory: "Travel & Leisure"
    },
    {
      title: "Black New York Fashion Week Designer Promotes Fashion with a Mission",
      summary: "Edwing D’Angelo celebrated the 5th anniversary of his atelier with a star-studded fundraising soirée blending high fashion with a powerful mission.",
      expectedCategory: "Pop Culture & Celebrities"
    },
    {
      title: "Kendrick Lamar Shatters Records Following Super Bowl Performance",
      summary: "Kendrick Lamar has once again solidified his position as a trailblazer in the music industry following his record-breaking Super Bowl performance.",
      expectedCategory: "Music & Film"
    },
    {
      title: "Notable Black People Who Died By Suicide",
      summary: "Overall statistics point to Black people typically having among the lowest suicide rates, but new data shows those numbers have changed for the worse.",
      expectedCategory: "Health & Wellness"
    },
    {
      title: "Viacom Sues Nick Cannon and Zeus Network Over ‘Bad Vs. Wild’",
      summary: "Viacom has sued Nick Cannon and Zeus Network over ‘Bad Vs. Wild’. Nick Cannon is known for creating and hosting MTV's 'Wild ‘N Out'.",
      expectedCategory: "Business"
    },
    {
      title: "Jared ‘Jay B.’ Boyd Shares Vision for the Future of Memphis Music",
      summary: "Jared ‘Jay B.’ Boyd, governor of the Memphis Grammy Chapter and program director of WYXR, shared his vision for the future of music in the city.",
      expectedCategory: "Music & Film"
    },
    {
      title: "Ye Attempts To Rationalize Selling Swastika T-Shirts With Explanation",
      summary: "Kanye West continues his streak of bigoted and misguided views on Jewish people, attempting to rationalize his decision to sell Swastika-themed T-shirts.",
      expectedCategory: "Politics"
    },
    {
      title: "People Should Be Ashamed: South Carolina Police Department Forced to Remove Black History Posts",
      summary: "A South Carolina police department has deleted its social media posts honoring Black History Month after backlash from officials.",
      expectedCategory: "Politics"
    },
    {
      title: "Self-Proclaimed ‘Michael Myers’ Gets the Craziest Prison Sentence We've Seen",
      summary: "Tennessee prosecutors just concluded their case against a murderer who took inspiration from a fictional horror movie character.",
      expectedCategory: "Crime"
    },
    {
      title: "How Severe Can Hidradenitis Suppurativa Get?",
      summary: "A large percentage of the global population suffers from Hidradenitis Suppurativa (HS), a chronic skin disorder that affects many individuals worldwide.",
      expectedCategory: "Health & Wellness"
    },
    {
      title: "A Parade Celebrating Frederick Douglass is Canceled After Maryland Controversy",
      summary: "The Department of Defense announced that celebrating 'identity months' is being discontinued, leading to the cancellation of a Frederick Douglass parade.",
      expectedCategory: "Politics"
    },
    {
      title: "50 Cent Disses Joe Budden for Saying Fif Needs Therapy",
      summary: "50 Cent takes offense at Joe Budden’s comments, sparking a new round of public feuding between the two rap personalities.",
      expectedCategory: "Music & Film"
    },
    {
      title: "5 Proven Ways to Conquer Your First Half Marathon",
      summary: "The journey to completing a 13.1-mile half marathon represents an achievable challenge for runners at every level, with these expert-backed strategies.",
      expectedCategory: "Health & Wellness"
    },
    {
      title: "Signs Your Cold is Gone but Recovery is Not Over",
      summary: "Recovering from a cold may seem straightforward, but lingering symptoms can persist, requiring proper care and attention.",
      expectedCategory: "Health & Wellness"
    },
    {
      title: "HBCU Combine: These Are the Players Who Drew the Most Attention",
      summary: "HBCU football players made headlines at this year’s combine, showing their athletic prowess and drawing attention from top scouts.",
      expectedCategory: "Sports"
    },
    {
      title: "Hot Girl Spirits: Megan Thee Stallion Debuts Chicas Divertidas Tequila",
      summary: "Megan Thee Stallion enters the spirits industry with Chicas Divertidas, her new tequila brand set to disrupt the liquor market.",
      expectedCategory: "Business"
    }
  ];

  for (const { title, summary, expectedCategory } of testCases) {
      try {
          console.log("--------------------------------------------------");
          console.log(`📝 Title: ${title}`);
          console.log(`📝 Expected Category: ${expectedCategory}`);
          const category = await categorizeArticle(title, summary);
          console.log(`✅ Assigned Category: ${category}`);
          console.log(`🔎 Match: ${category === expectedCategory ? "✅ Correct" : "❌ Incorrect"}`);
          console.log("--------------------------------------------------\n");
      } catch (error: unknown) {
          if (error instanceof Error) {
              console.error(`❌ Error categorizing article: ${error.message}`);
          } else {
              console.error("❌ Unknown error occurred during categorization");
          }
      }
  }
}

// ✅ Run the test
testCategorization();
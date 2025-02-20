import "dotenv/config"; // ✅ Ensures the .env file is loaded
import axios from "axios";

// ✅ Load the Hugging Face API token from environment variables
const HF_TOKEN = process.env.HF_TOKEN;
if (!HF_TOKEN) {
    console.error("❌ Error: Hugging Face token is missing. Ensure HF_TOKEN is set in your .env file.");
    process.exit(1);
}

// ✅ Updated Model URL (facebook/bart-large-mnli)
const HF_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";

// ✅ Define categories with clear AI guidance
// ✅ Define categories with clear AI guidance
const CATEGORY_GUIDANCE = {
  "Politics": "Articles about government actions, elections, legislative policies, political debates, public figures, civil rights advocacy, campaign updates, voting laws, and congressional affairs. Excludes corporate DEI programs. Includes advocacy efforts by organizations like the NAACP related to public policies.",

  "Business": "Articles about financial markets, corporate mergers, entrepreneurship, company policies, investment trends, industry regulations, corporate diversity programs, brand partnerships, and economic developments. Includes sneaker brand collaborations but excludes general celebrity endorsements, entertainment industry disputes, music industry feuds, artist credibility controversies, and stand-up comedy censorship. **Excludes media censorship affecting comedians, TV hosts, or musicians.**",

  "Science & Technology": "Articles about AI advancements, space exploration, cybersecurity risks, engineering breakthroughs, medical innovations, environmental research, and cutting-edge scientific discoveries. Excludes corporate tech business deals unless focused on technological innovation.",

  "Health & Wellness": "Articles about medical research, disease prevention, mental health awareness, nutrition trends, fitness studies, healthcare accessibility, public health initiatives, and emerging wellness treatments.",

  "Sports": "Articles about professional and college athletics, major tournaments, athlete milestones, league standings, championship events, Olympic competitions, sports controversies, and player activism. Excludes sneaker releases unrelated to performance and excludes actors or entertainers wearing sports apparel in non-sports settings.",

  "Travel & Leisure": "Articles about tourism hotspots, airline policies, travel experiences, destination reviews, hospitality trends, adventure tourism, and vacation planning. Excludes migration or relocation discussions.",

  "Music & Film": "Articles about the entertainment industry, film releases, television productions, music awards, artist controversies, directorial work, album launches, and streaming platform updates. Includes **performance credibility disputes, lip-syncing accusations, live performance controversies, artist feuds, and backlash related to artistic authenticity.** Explicitly includes **public artist responses to criticism or performance accusations.** Excludes financial reports, business contracts, and record label revenue-based disputes.",

  "Pop Culture & Celebrities": "Articles about celebrity lifestyles, viral trends, social media movements, reality TV moments, influencer culture, entertainment industry gossip, red carpet fashion, and high-profile relationships. Includes **stand-up comedy controversies, TV show censorship debates, public appearances by entertainers, and actors wearing designer or sports brands.** Explicitly includes **censorship cases involving comedians, late-night TV hosts, and entertainment figures facing restrictions on speech or performance.** Excludes financial aspects of TV networks and corporate business policies.",

  "Education": "Articles about school funding, curriculum reforms, student programs, higher education policies, scholarship opportunities, standardized testing, university rankings, and HBCU initiatives. Excludes labor-related academic disputes."
};

/**
 * Categorizes an article based on its title and summary.
 *
 * @param {string} title - The article title.
 * @param {string} summary - The article summary.
 * @returns {Promise<string>} - The predicted category.
 */
export async function categorizeArticle(title: string, summary: string): Promise<string> {
    try {
        console.log("🧠 Categorizing article:", title);
        console.log("🔍 Sending request to Hugging Face API...");

        // ✅ Prepare AI input with clear category descriptions
        const response = await axios.post(
            HF_API_URL,
            {
                inputs: `${title}\n\n${summary}`,
                parameters: {
                    candidate_labels: Object.keys(CATEGORY_GUIDANCE), // ✅ Uses updated categories
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
        // use this code below for debugging if you run into problems.
        // console.log("✅ API Response:", response.data); // ✅ Log the full response from Hugging Face

        // ✅ Ensure data exists before accessing it
        if (!response.data || !response.data.labels || response.data.labels.length === 0) {
            throw new Error("No categories returned from the model.");
        }

        const bestCategory = response.data.labels[0]; // ✅ Selects the highest-confidence category
        console.log(`✅ Category assigned: ${bestCategory}`);
        return bestCategory;

    } catch (error: any) {
        if (error.response) {
            console.error("❌ Hugging Face API Error:", error.response.status, error.response.data);
        } else {
            console.error("❌ Unexpected Error:", error.message);
        }
        throw error;
    }
}
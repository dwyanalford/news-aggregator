// purely handle the cateogorization logic and return the result, all logging and output 
// should happen in the script.

import "dotenv/config"; // ✅ Ensures the .env file is loaded
import axios from "axios";

// ✅ Load the Hugging Face API token from environment variables
const HF_TOKEN = process.env.HF_TOKEN;
if (!HF_TOKEN) {
    console.error("❌ Error: Hugging Face token is missing. Ensure HF_TOKEN is set in your .env file.");
    process.exit(1);
}

// ✅ Updated Model URL (facebook/bart-large-mnli)
//const HF_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
//const HF_API_URL = "https://api-inference.huggingface.co/models/joeddav/xlm-roberta-large-xnli";
const HF_API_URL = "https://api-inference.huggingface.co/models/MoritzLaurer/deberta-v3-large-zeroshot-v2.0";


// ✅ Define categories with clear AI guidance

const CATEGORY_GUIDANCE = {
    "Politics & Law": "Articles about government actions, elections, legislation, political debates, public figures, civil rights, and campaigns.",
  
    "Business & Finance": "Articles about financial markets, corporate activities, entrepreneurship, investments, legal disputes, and economic developments. Excludes celebrity gossip, social media trends, and entertainment.",
  
    "Science & Technology": "Articles about AI, space exploration, cybersecurity, engineering, medical innovations, and scientific research. Excludes business mergers, entertainment news, and celebrity involvement.",
  
    "Health & Wellness": "Articles about medical research, disease prevention, mental health, fitness, healthcare accessibility, and wellness trends.",
  
    "Sports": "Articles about professional and college sports, tournaments, athlete milestones, league standings, and sports controversies.",
  
    "Travel & Food": "Articles about travel destinations, airline policies, travel experiences, hospitality trends, culinary tourism, restaurant reviews, and global cuisine.",
  
    "Fashion": "Articles about fashion trends, designer profiles, runway shows, fashion weeks, industry news, clothing innovations, and style icons.",
  
    "Music & Film": "Articles about entertainment industry news, film releases, television productions, music awards, and artist achievements.",
  
    "Pop Culture & Celebrities": "Articles about celebrity news, viral trends, social media movements, influencer culture, and entertainment gossip.",
  
    "Education": "Articles about school funding, curriculum reforms, higher education policies, scholarships, and academic achievements."
  };

/**
 * Categorizes an article based on its title and summary.
 *
 * @param {string} title - The article title.
 * @param {string} summary - The article summary.
 * @returns {Promise<string>} - The predicted category.
 */
export async function categorizeArticle(title: string): Promise<string> {
    try {
        console.log("🧠 Categorizing article:", title);
        console.log("🔍 Sending request to Hugging Face API...");

        // ✅ Prepare AI input with clear category descriptions
        const response = await axios.post(
            HF_API_URL,
            {
                inputs: `${title}`,
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
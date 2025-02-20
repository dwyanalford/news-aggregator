import axios from 'axios';

const PREDEFINED_CATEGORIES = [
  "Politics", "Health", "Sports", "Entertainment", 
  "Technology", "Business", "Science", "Lifestyle", "Other"
];

export async function categorizeArticle(title: string, summary: string): Promise<string> {
  const prompt = `Given the following article title and summary, choose the most appropriate category from the list: ${PREDEFINED_CATEGORIES.join(", ")}.
  
Title: ${title}
Summary: ${summary}

Only output the category name.`;
  
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo",
        prompt,
        max_tokens: 10,
        temperature: 0.0,
        n: 1,
        stop: ["\n"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    
    const category = response.data.choices[0].text.trim();
    // Validate that the returned category is one of the predefined ones.
    if (PREDEFINED_CATEGORIES.includes(category)) {
      return category;
    }
    return "Other";
  } catch (error) {
    console.error("Error categorizing article:", error);
    return "General";
  }
}
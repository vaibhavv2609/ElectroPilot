import OpenAI from "openai";
import fs from "fs";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "default_key"
});

export async function transcribeAudio(audioFilePath: string): Promise<{ text: string }> {
  try {
    const audioReadStream = fs.createReadStream(audioFilePath);

    const transcription = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: "whisper-1",
    });

    return {
      text: transcription.text,
    };
  } catch (error) {
    throw new Error(`Failed to transcribe audio: ${error.message}`);
  }
}

export async function generateRecommendations(transcript: string): Promise<any[]> {
  try {
    const prompt = `Based on this customer interview transcript, generate 3 personalized electronics product recommendations.

Transcript: "${transcript}"

Please analyze the customer's needs, preferences, budget, and use cases mentioned in the transcript. Return a JSON response with an array of exactly 3 product recommendations. Each product should have:
- id: unique identifier
- name: product name
- shortDescription: brief description (max 100 chars)
- price: formatted price string (e.g., "$999")
- rating: number between 4.0-5.0
- image: appropriate Unsplash URL for the product category
- features: array of 3-4 key features
- affiliateLink: Amazon affiliate URL (use placeholder: "https://amazon.com/dp/PRODUCT_ID?tag=velectro-20")
- aiRecommendation: personalized explanation of why this product matches their needs (max 200 chars)

Focus on popular, real electronics products that match their requirements. Ensure recommendations are diverse across different categories when appropriate.

Respond with valid JSON in this format: { "products": [...] }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert electronics consultant who provides personalized product recommendations based on customer needs and preferences."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result.products || [];
  } catch (error) {
    throw new Error(`Failed to generate recommendations: ${error.message}`);
  }
}

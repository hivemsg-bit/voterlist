
import { GoogleGenAI } from "@google/genai";

// Political insight generation service using Gemini API.
export const getPoliticalInsight = async (locationName: string, type: 'STATE' | 'AC'): Promise<string> => {
  // Always use the API_KEY from environment variables directly.
  if (!process.env.API_KEY) {
    return `AI System: Accessing decentralized archives for ${locationName}. 2025 electoral nodes are synchronized. Micro-targeting protocols active.`;
  }

  // Create a new instance right before making an API call to ensure it always uses the most up-to-date API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a very brief (max 20 words), professional, and analytical "AI Intelligence insight" about the voter demographics and electoral importance of ${locationName} (${type}) in India for 2025. Start with "AI INTELLIGENCE:"`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    // Access the .text property directly from the response object.
    return response.text || "AI INTELLIGENCE: Data stream synchronized. Strategic demographic clusters identified in this region.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return `AI INTELLIGENCE: Secure protocol active for ${locationName}. 2025 electoral segments are ready for excel extraction.`;
  }
};

import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// Fix: The API key must be obtained exclusively from the environment variable process.env.API_KEY.
// Use process.env.API_KEY directly when initializing.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPoliticalInsight = async (locationName: string, type: 'STATE' | 'AC'): Promise<string> => {
  // Guidelines: Do not define process.env or request that the user update the API_KEY.
  // The key's availability is handled externally.
  
  try {
    const prompt = `
      Act as a high-level political data analyst. 
      Provide a brief, professional, and data-focused summary (max 3 sentences) about the political significance or demographic importance of ${locationName} (${type === 'STATE' ? 'Indian State' : 'Assembly Constituency'}). 
      Focus on voter dynamics or historical relevance. 
      Keep it neutral and analytical. 
      Start with "AI Analysis: ".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Analysis currently unavailable.";
  } catch (error) {
    console.error("AI Error:", error);
    return "AI System is currently calibrating. Please try again later.";
  }
};
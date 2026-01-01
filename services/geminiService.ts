
import { GoogleGenAI } from "@google/genai";

// Ensure process.env is safely accessed via a fallback or shim
const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : "";
const ai = new GoogleGenAI({ apiKey: apiKey });

export const getPoliticalInsight = async (locationName: string, type: 'STATE' | 'AC'): Promise<string> => {
  if (!apiKey) {
    return "AI insights are enabled only with a valid system key.";
  }

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

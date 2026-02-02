import { GoogleGenAI } from "@google/genai";

// Helper to get AI instance
// Fix: Use new GoogleGenAI({apiKey: process.env.API_KEY}) named parameter as required.
const getAI = () => {
  if (!process.env.API_KEY) return null;
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
}

// 1. Existing Insight Service
// Fix: Updated model to 'gemini-3-flash-preview' for basic text tasks and use .text property.
export const getPoliticalInsight = async (locationName: string, type: 'STATE' | 'AC'): Promise<string> => {
  const ai = getAI();
  if (!ai) return `AI System: Accessing decentralized archives for ${locationName}. 2025 electoral nodes are synchronized.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: `Provide a very brief (max 20 words), professional, and analytical "AI Intelligence insight" about the voter demographics and electoral importance of ${locationName} (${type}) in India for 2025. Start with "AI INTELLIGENCE:"`,
      config: { temperature: 0.7 }
    });
    // Fix: Access response.text directly (getter, not a method).
    return response.text || "AI INTELLIGENCE: Data stream synchronized. Strategic demographic clusters identified.";
  } catch (error) {
    return `AI INTELLIGENCE: Secure protocol active for ${locationName}. 2025 electoral segments are ready.`;
  }
};

// 2. NEW: Generic Campaign AI Generator
// Fix: Updated model to 'gemini-3-flash-preview' for text generation tasks.
export const generateCampaignAI = async (
  toolType: 'SLOGAN' | 'IVR_SCRIPT' | 'SURVEY_QUESTIONS' | 'STRATEGY', 
  params: Record<string, string>
): Promise<string> => {
  const ai = getAI();
  
  // Fallback responses if no API key
  if (!ai) {
    if (toolType === 'SLOGAN') return "1. Desh Ki Shaan, Humara Neta Mahan!\n2. Vikas Ki Raftar, Is Baar Phir Modi Sarkar (Example)\n3. Nayi Soch, Nayi Umeed.";
    if (toolType === 'IVR_SCRIPT') return "Namaskar! Main [Candidate Name] bol raha hoon. Is baar vikas ko vote dein...";
    return "AI system requires API Key. Please contact admin.";
  }

  let prompt = "";

  switch (toolType) {
    case 'SLOGAN':
      prompt = `Act as an expert Indian Political Campaign Manager. Write 5 catchy, rhyming, and powerful election slogans in ${params.language} for a candidate named "${params.name}" from party "${params.party}". The key theme is "${params.theme}". Output as a numbered list.`;
      break;
    
    case 'IVR_SCRIPT':
      prompt = `Write a 30-second professional script for an Automated Voice Call (OBD/IVR) for an Indian election campaign.
      Candidate: ${params.name}
      Party: ${params.party}
      Message Focus: ${params.focus}
      Language: ${params.language} (Use Roman Script for Hindi if selected).
      The script should be polite, energetic, and end with a call to action to press a button or vote.`;
      break;

    case 'SURVEY_QUESTIONS':
      prompt = `Design a professional Political Opinion Poll Survey (5 Questions) for the constituency: ${params.region}.
      Focus area: ${params.topic}.
      Language: ${params.language}.
      The questions should be unbiased and suitable for a door-to-door survey app. Return as a numbered list.`;
      break;
      
    case 'STRATEGY':
      prompt = `Analyze the political situation for a campaign focusing on: ${params.focus}. Give 3 bullet points of strategic advice for winning this election in India.`;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: prompt,
      config: { 
        temperature: 0.8,
        topK: 40
      }
    });
    // Fix: Access response.text directly (getter, not a method).
    return response.text || "AI Generation failed. Please try again.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return "Network error. Please try again later.";
  }
};

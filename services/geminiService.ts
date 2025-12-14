import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize the client
// The API key is injected via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTextResponse = async (
  message: string,
  history: ChatMessage[]
): Promise<string> => {
  try {
    // We use the flash model for quick text responses
    const modelId = 'gemini-2.5-flash';
    
    // Construct a simple history context for the prompt
    // Ideally, one would use ai.chats.create() for stateful chats, 
    // but for this stateless service example, we append context manually or use simple generation
    // to keep the demo lightweight and robust.
    
    const prompt = `
      You are Astra, a helpful and intelligent AI assistant. You can speak Bengali fluently and are helpful to users speaking Bengali.
      
      Conversation History:
      ${history.map(h => `${h.role === 'user' ? 'User' : 'Model'}: ${h.text}`).join('\n')}
      
      User: ${message}
      Model:
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });

    return response.text || "আমি কোনো উত্তর তৈরি করতে পারিনি।";
  } catch (error) {
    console.error("Gemini Text Gen Error:", error);
    throw new Error("Failed to generate response. Please try again.");
  }
};

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    // Using gemini-2.5-flash-image for standard image generation tasks
    // as per guidelines for general image generation.
    const modelId = 'gemini-2.5-flash-image';

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      // No specific imageConfig needed for default 1:1 square images
    });

    // Iterate through parts to find the image
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    throw new Error("Failed to generate image.");
  }
};
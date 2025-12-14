import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateRobloxIdea = async (genre: string, language: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "API Key missing.";

  const prompt = language === 'pt' 
    ? `Gere uma ideia única e detalhada de jogo para Roblox no gênero: ${genre}. Inclua mecânicas principais e loop de gameplay.`
    : `Generate a unique and detailed Roblox game idea for the genre: ${genre}. Include core mechanics and gameplay loop.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error generating idea:", error);
    return "Error generating content. Please check API key.";
  }
};

export const generateLuaScript = async (description: string, language: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "-- API Key missing.";

  const prompt = language === 'pt'
    ? `Escreva um script Lua para Roblox Studio que faça o seguinte: ${description}. Inclua comentários explicando o código.`
    : `Write a Roblox Studio Lua script that does the following: ${description}. Include comments explaining the code.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    // Strip markdown code blocks if present
    let text = response.text || "";
    text = text.replace(/```lua/g, '').replace(/```/g, '');
    return text;
  } catch (error) {
    console.error("Error generating script:", error);
    return "-- Error generating script. Please check console.";
  }
};

export const chatWithAi = async (message: string, context: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Error: No API Key";

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "You are a helpful expert assistant for Roblox game development (Roblox Master Studio). You know Lua, Roblox Studio interface, and game design."
        },
        contents: `Context: ${context}\n\nUser Question: ${message}`
    });
    return response.text || "";
  } catch (error) {
    return "I couldn't process that request right now.";
  }
};
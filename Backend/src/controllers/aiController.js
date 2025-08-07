import { GoogleGenAI } from "@google/genai";

async function aiChat(req,res){
  try{
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

    async function main() {
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: ``,
        },
        history: [
          {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
          },
        ],
      });

      const response1 = await chat.sendMessage({
        message: "I have 2 dogs in my house.",
      });
    }

    await main();
  }catch(err){

  }
}



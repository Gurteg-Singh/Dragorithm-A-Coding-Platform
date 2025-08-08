const { GoogleGenAI } = require("@google/genai");

async function aiChat(req,res){
  try{
    const prompt = req.body?.prompt;
    if(!prompt){
      throw new Error("prompt not found");
    }
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

      const response = await chat.sendMessage({
        message: prompt,
      });

      res.status(200).send(response.text);
    }

    await main();
  }catch(err){
    console.log(err.message);
  }
}

module.exports = {aiChat};



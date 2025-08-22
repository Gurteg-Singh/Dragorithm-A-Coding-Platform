const { GoogleGenAI } = require("@google/genai");

async function aiChat(req,res){
  try{
    const {title,description,visibleTestCasesForUser,solution} = req.body;
    const prompt = req.body?.prompt;
    if(!prompt){
      throw new Error("prompt not found");
    }
    const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

    async function main() {
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: `Hi, you are a Data Structure and Algorithms Instructor. You help users to solve their doubts regarding 
          Data Structure and Algorithms . You will only give valid answer related to the following problem : 
          name : ${title},
          description : ${description} . Here is one test case for you for better understanding. 
          Input : ${visibleTestCasesForUser?.[0]?.input},
          Output : ${visibleTestCasesForUser?.[0]?.output},
          Input : ${visibleTestCasesForUser?.[0]?.explanation}.
          In case u do not know the solution, here is the refernce solution for you in C++ : 
          solution : ${solution?.[0]?.codeSolution}.
          U are free to answer queries related to topics that are related . Suppose the coding problem was regarding arithematic progression
          then u can answer mathematical questions also like AP in this case . So if user asking about a concept which is needed to solve the
          problem you can help with that also. Now , if user aks any other questions which are not related to the given DSA problem give them a
          savage reply like "buddy , I m here to help you with ${title} problem , why are you asking another irrelevant stuff.You can never 
          get hired with this kind of stupidity". You don't have to give this exact savage reply if user question is irrelevant, this was just
          an example for you. Note this savage reply was just an example , don't give to user instead think something similar that is savage.`,
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



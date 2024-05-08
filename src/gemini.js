// node --version # Should be >= 18
// npm install @google/generative-ai

import  {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from"@google/generative-ai";
  
  const MODEL_NAME = "gemini-1.5-pro-latest";
  const API_KEY = "AIzaSyAaaGxxEy2iplfK9gcjkwLUWk33-0gqWvw";
  
  async function runChat(prompts) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 1,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8192,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
      ],
    });
  
    const result = await chat.sendMessage(prompts);
    const response = result.response;
    const res=response.text(prompts).replace(/\*/g, '')
    console.log(response.text(prompts));
    return res;
  }
  
 export default  runChat;
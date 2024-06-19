
  /* Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */
// removed the intial const and required 
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyDoJMUZzF0S-1qlQEnq6ozIuV9fOkhCqk8"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro",
});

const generationConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 0,
    maxOutputTokens: 2048,
    responseMimeType: "text/plain",
};
// add prompt 
async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [],
    });
// added prompt here 
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
}

export default run;
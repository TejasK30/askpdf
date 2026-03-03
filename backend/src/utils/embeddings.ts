import "dotenv/config"
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"

export const getGeminiEmbeddings = () => {
  return new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY!,
    model: process.env.GEMINI_EMBEDDING_MODEL!,
  })
}

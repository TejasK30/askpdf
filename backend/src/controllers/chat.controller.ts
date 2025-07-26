import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { Request, Response } from "express"
import { getGeminiEmbeddings } from "../utils/embeddings"
import { getVectoreStore } from "../utils/vectorstore"

/**
 * Handles chat requests using Gemini 2.0 Flash model.
 *
 * Flow:
 * - Extract user query
 * - Generate embeddings
 * - Retrieve relevant context from vector store
 * - Pass context and user query to Gemini model
 * - Return model-generated response to client
 */

export const chat = async (req: Request, res: Response): Promise<any> => {
  try {
    // Extract the user query
    const { userQuery } = req.body

    if (!userQuery || typeof userQuery !== "string") {
      return res.status(400).json({ message: "Invalid user query." })
    }

    // Initialize Gemini model
    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_API_KEY!,
      model: "gemini-2.0-flash",
    })

    // Get embeddings
    const embeddings = getGeminiEmbeddings()

    // initialize a vector store from QDRANT
    const vectorStore = await getVectoreStore(embeddings)

    // find top-k relevant documents
    const retriever = vectorStore.asRetriever({ k: 2 })

    // Retrieve top matching documents based on user query
    const docs = await retriever.invoke(userQuery)

    // extract page content from the retrieved documents
    const context = docs.map((doc) => doc.pageContent)

    // prompt model with context and user query
    const response = await model.invoke([
      [
        "system",
        `You are a helpful AI assistant that answers questions using ONLY the following PDF context.
        Context: ${context}`,
      ],
      ["user", userQuery],
    ])

    // Return the generated response
    return res.status(200).json(response.content)
  } catch (error) {
    // error handling
    console.error("Chat route error:", error)
    return res.status(500).json({
      message: "Something went wrong please try again later.",
    })
  }
}

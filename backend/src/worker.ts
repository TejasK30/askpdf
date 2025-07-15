import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { Worker } from "bullmq"
import { getGeminiEmbeddings } from "./utils/embeddings"
import { getVectoreStore } from "./utils/vectorstore"

const worker = new Worker(
  "file-upload-queue",
  async (job) => {
    try {
      const data = job.data

      console.log("Received file path: ", data.path)

      // give path to PDFLoader and load the PDF
      const loader = new PDFLoader(data.path)

      // get docs from pdf
      const docs = await loader.load()

      // embeddings model - GEMINI
      const embeddings = getGeminiEmbeddings()

      // initialize the vectore store to add the documents into QDRANT vector store
      const vectorStore = await getVectoreStore(embeddings)

      // add the documents into vector store
      await vectorStore.addDocuments(docs)
    } catch (error) {
      console.error("Worker job failed:", error)
    }
  },
  {
    concurrency: 100,
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
)

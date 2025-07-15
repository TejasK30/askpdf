import "dotenv/config"
import cors from "cors"
import express, { Request, Response } from "express"
import multer from "multer"
import { fileUploadController } from "./controllers/upload.controller"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import { getGeminiEmbeddings } from "./utils/embeddings"
import { getVectoreStore } from "./utils/vectorstore"
import { Queue } from "bullmq"
import { storage } from "./config/fileupload.config"
import { chat } from "./controllers/chat.controller"

const app = express()

app.use(express.json())

const upload = multer({ storage: storage })

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

// file upload controller
app.post("/upload", upload.single("file"), fileUploadController)

// chat route with LLM
app.post("/chat", chat)

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "askpdf server" })
})

app.listen(5000, () => {
  console.log("Server is started on port: 5000")
})

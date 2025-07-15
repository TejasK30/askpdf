import { QdrantVectorStore } from "@langchain/qdrant"
import { Embeddings } from "@langchain/core/embeddings"

export const getVectoreStore = async (embeddings: Embeddings) => {
  return await QdrantVectorStore.fromExistingCollection(embeddings, {
    url: process.env.QDRANT_URL,
    collectionName: "askpdf",
  })
}

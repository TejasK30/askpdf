# askpdf

askpdf is a Retrieval-Augmented Generation (RAG) application that enables users to upload PDF files and interactively ask questions based on the content of those PDFs. The system leverages modern AI, vector search, and a full-stack web architecture for seamless document Q&A experiences.

## Features

- Upload PDF files and extract their content
- Ask questions about uploaded PDFs and get context-aware answers
- Frontend built with Next.js and Tailwind CSS
- Backend powered by Express, LangChain, Google GenAI, and Qdrant for vector search
- Background processing with BullMQ

## Tech Stack

### Backend

- Node.js, Express
- TypeScript
- LangChain, Google GenAI, Qdrant
- BullMQ (background jobs)
- Multer (file uploads)
- PDF-Parse (PDF extraction)
- CORS, dotenv

### Frontend

- Next.js (React 19)
- Tailwind CSS
- Shadcn UI components

## Getting Started

### Prerequisites

- Node.js
- pnpm

### Installation

Clone the repository and install dependencies for both backend and frontend:

````sh
cd frontend
pnpm install
cd ../backend
pnpm install
```

### Running the Application

#### Backend

```sh
cd backend
pnpm dev
pnpm worker # to run the worker that handles pdf processing
````

The frontend will be at `http://localhost:5000`

#### Frontend

```sh
cd frontend
pnpm dev
```

The frontend will be available at `http://localhost:3000` by default.

### Environment Variables

Create a `.env` file in the `backend` directory with the required API keys and configuration. See `.env.example`.

### File Uploads

Uploaded PDFs are stored in the `uploads/` directory.

## Project Structure

- `backend/` — Express API, file upload, vector store, and worker
- `frontend/` — Next.js app, UI components
- `uploads/` — Uploaded PDF files

## Scripts

### Backend

- `pnpm dev` — Start the backend server
- `pnpm worker` — Start the background worker

### Frontend

- `pnpm dev` — Start the Next.js development server
- `pnpm build` — Build the frontend for production
- `pnpm start` — Start the production frontend

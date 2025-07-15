"use client"

import { Upload } from "lucide-react"
import { useRef } from "react"
import { Button } from "./button"
import { Input } from "./input"

const Chat = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileSelectClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (!selectedFile) return

    if (selectedFile.type !== "application/pdf") {
      alert("Please select a valid PDF file.")
      return
    }

    console.log("Selected file:", selectedFile)
  }

  return (
    <div className="flex flex-col justify-between flex-1 bg-slate-50 min-h-screen">
      <div className="text-2xl font-semibold text-white text-center py-4 bg-indigo-700 shadow">
        Askpdf : Chat with PDF
      </div>

      <div className="px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3 rounded-full px-4 py-2 bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-400">
          <Input
            placeholder="Ask something about your PDF..."
            autoFocus
            className="flex-1 px-4 py-2 bg-transparent !border-none !outline-none !ring-0 !shadow-none focus:!ring-0 focus:!outline-none focus:!border-none focus-within:ring-2 focus-within:ring-indigo-400"
          />

          <Button
            type="button"
            onClick={handleFileSelectClick}
            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full p-2"
            title="Upload PDF"
          >
            <Upload className="w-5 h-5" />
          </Button>

          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-7.5-15-7.5v6l10 1.5-10 1.5v6z"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Chat

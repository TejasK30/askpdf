"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

export default function FileUploadDialog() {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<{ message: string; success?: boolean }>()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setStatus(undefined)
    if (selectedFile?.type === "application/pdf") {
      setFile(selectedFile)
    } else {
      setStatus({ message: "Select a valid PDF file!", success: false })
      setFile(null)
    }
  }

  const handleFileUpload = async () => {
    if (!file) {
      setStatus({ message: "No file selected.", success: false })
      return
    }

    if (file.size > 100 * 1024 * 1024) {
      setStatus({ message: "File too large.", success: false })
      return
    }

    const formData = new FormData()
    formData.set("file", file)

    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      setStatus({ message: "Uploaded successfully!", success: true })
      setFile(null)
      setOpen(false)
    } else {
      setStatus({ message: "Upload failed.", success: false })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full p-2"
          title="Upload PDF"
        >
          <Upload className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Upload PDF</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 text-gray-800 p-4 rounded-md">
          <Label className="text-lg font-semibold">
            Choose a file to chat with:
          </Label>
          <Input type="file" accept=".pdf" onChange={handleFileChange} />
          {file && (
            <div className="text-sm text-gray-700">
              <p>
                <strong>Name:</strong> {file.name}
              </p>
              <p>
                <strong>Size:</strong> {(file.size / (1024 * 1024)).toFixed(2)}{" "}
                MB
              </p>
              <p>
                <strong>Type:</strong> {file.type}
              </p>
            </div>
          )}
          {status && (
            <span
              className={status.success ? "text-green-500" : "text-red-500"}
            >
              {status.message}
            </span>
          )}
          <Button
            onClick={handleFileUpload}
            className="bg-indigo-500 hover:bg-indigo-700"
          >
            Upload PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

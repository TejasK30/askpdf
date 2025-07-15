"use client"

import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import { Button } from "./button"
import { Input } from "./input"

type statusType = {
  message: string
  success?: boolean
}

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<statusType>()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
    } else {
      setStatus({ message: "select a pdf file!", success: false })
      setFile(null)
    }
  }

  const handleFileUpload = async () => {
    try {
      if (!file) {
        setStatus({ message: "No file selected.", success: false })
        return
      }

      if (file.size > 100 * 1024 * 1024) {
        setStatus({ message: "File size exceeds 100MB limit.", success: false })
        return
      }

      const formdata = new FormData()

      formdata.set("file", file)

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formdata,
      })

      if (response.ok) {
        setStatus({ message: "File succesfully uploaded", success: true })
      }
    } catch (error) {
      console.log(error)
      setStatus({ message: "File upload failed", success: false })
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <div className="flex flex-col items-center text-gray-800 justify-center p-6 bg-[#aeb8fe] rounded-md shadow-md">
          <Label
            htmlFor="fileInput"
            className="text-gray-800 mb-2 text-lg font-semibold"
          >
            Enter file to chat
          </Label>
          <Input
            className="text-gray-800"
            name="fileInput"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />

          {file && (
            <div className="mt-3 text-sm text-gray-700">
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

          <Button type="submit" onClick={handleFileUpload} className="mt-5">
            Submit file
          </Button>
        </div>
      </div>
    </>
  )
}

export default FileUpload

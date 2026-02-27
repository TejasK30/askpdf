"use client"

import { Message } from "@/lib/types"
import { useRef, useState } from "react"
import ChatInputForm from "./ChatInputForm"
import Header from "./Header"
import Loading from "./Loading"
import Messages from "./Messages"

const Chat = () => {
  const [message, setMessage] = useState<Message>({
    role: "user",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const [messages, setMessages] = useState<Message[]>([])

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.message.trim()) return

    const userMessage = message.message

    setMessages((prev) => [...prev, { role: "user", message: userMessage }])
    setMessage({ role: "user", message: "" })

    try {
      setLoading(true)
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuery: userMessage }),
      })

      const data = await res.json()

      setMessages((prev) => [...prev, { role: "system", message: data.answer }])
    } catch (err) {
      setLoading(false)
      console.error("Error fetching reply:", err)
      setMessages((prev) => [
        ...prev,
        { role: "system", message: "Failed to get response from server." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <Messages
        messages={messages}
        messagesEndRef={messagesEndRef}
        loading={loading}
      />

      <ChatInputForm
        message={message}
        setMessage={setMessage}
        onSubmit={handleMessageSubmit}
      />
    </div>
  )
}

export default Chat

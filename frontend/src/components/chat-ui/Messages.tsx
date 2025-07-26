import { Message } from "@/lib/types"
import { useEffect } from "react"

interface Props {
  messages: Message[]
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}

const Messages = ({ messages, messagesEndRef }: Props) => {
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`max-w-[75%] p-3 rounded-full text-sm ${
            msg.role === "user"
              ? "bg-indigo-200 self-end text-right"
              : "bg-indigo-400 self-start text-left"
          }`}
        >
          {msg.message}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default Messages

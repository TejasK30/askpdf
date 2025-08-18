"use client"
import { Message } from "@/lib/types"
import { useEffect, useState } from "react"
import Loading from "./Loading"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface Props {
  messages: Message[]
  messagesEndRef: React.RefObject<HTMLDivElement | null>
  loading: boolean
}

const Messages = ({ messages, messagesEndRef, loading }: Props) => {
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto px-5 sm:px-30 py-4 space-y-4 flex flex-col">
      {messages.map((msg, index) => {
        const isUser = msg.role === "user"
        return (
          <div
            key={index}
            className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed transition-all duration-200
              ${
                isUser
                  ? "bg-indigo-500 text-white self-end rounded-br-sm animate-slideUp"
                  : "bg-gray-200 text-gray-900 self-start rounded-bl-sm animate-slideUp"
              }`}
          >
            <ReactMarkdown
              components={{
                code: ({ inline, className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || "")
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        borderRadius: "0.5rem",
                        padding: "1rem",
                        fontSize: "0.875rem",
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className="bg-gray-300 px-1 py-0.5 rounded text-red-600"
                      {...props}
                    >
                      {children}
                    </code>
                  )
                },
              }}
            >
              {msg.message}
            </ReactMarkdown>
          </div>
        )
      })}

      {loading && (
        <div className="max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed bg-gray-200 text-gray-900 self-start animate-slideUp">
          <Loading label="Thinking..." className="text-gray-500" />
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default Messages

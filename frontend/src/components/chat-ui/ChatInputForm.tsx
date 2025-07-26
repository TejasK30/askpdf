import { Button } from "../ui/button"
import { Message } from "@/lib/types"
import { Input } from "../ui/input"
import FileUploadDialog from "./FileUploadDialog"

interface Props {
  message: Message
  setMessage: React.Dispatch<React.SetStateAction<Message>>
  onSubmit: (e: React.FormEvent) => void
}

export default function ChatInputForm({
  message,
  setMessage,
  onSubmit,
}: Props) {
  return (
    <div className="py-2 flex justify-center h-20">
      <form
        onSubmit={onSubmit}
        className="flex w-[60vw] items-center gap-3 rounded-full py-1 px-2 bg-gray-100 border-2 border-indigo-400"
      >
        <Input
          placeholder="Ask something about your PDF..."
          value={message.message}
          onChange={(e) => setMessage({ ...message, message: e.target.value })}
          className="flex-1 px-4 py-1 bg-transparent !border-none !outline-none !ring-0 !shadow-none focus:!ring-0 focus:!outline-none focus:!border-none focus-within:ring-2 text-sm focus-within:ring-indigo-400"
        />

        <FileUploadDialog />

        <Button
          type="submit"
          disabled={!message.message}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2"
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
      </form>
    </div>
  )
}

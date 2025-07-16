export interface Message {
  role: "user" | "system"
  message: string
}

export type statusType = {
  message: string
  success?: boolean
}

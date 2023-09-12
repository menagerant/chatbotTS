export type ChatGPTAgent = "user" | "assistant" | "system";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

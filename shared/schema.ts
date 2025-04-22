import { z } from "zod";

// Esquema para validar mensajes individuales
export const MessageSchema = z.object({
  role: z.enum(["system", "user", "assistant"]),
  content: z.string(),
});

// Esquema para validar la solicitud de chat
export const ChatRequestSchema = z.object({
  messages: z.array(MessageSchema),
  model: z.string().optional(), // Modelo a usar (opcional)
});

// Esquema para validar la respuesta del chat
export const ChatResponseSchema = z.object({
  message: MessageSchema,
});

// Tipos derivados de los esquemas para usar en TypeScript
export type Message = z.infer<typeof MessageSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;
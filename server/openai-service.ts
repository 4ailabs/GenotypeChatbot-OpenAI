import OpenAI from "openai";
import { ChatRequest, ChatResponse } from "../shared/schema.js";

// Inicializar el cliente de OpenAI con la API key del entorno
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Envía una solicitud al modelo de chat de OpenAI
 * @param request La solicitud de chat con mensajes y modelo opcional
 * @returns La respuesta del modelo de chat
 */
export async function sendChatRequest(request: ChatRequest): Promise<ChatResponse> {
  try {
    // Determinar qué modelo usar, con valor predeterminado si no se especifica
    const model = request.model || "gpt-3.5-turbo";
    
    // Enviar solicitud al API de OpenAI
    const response = await openai.chat.completions.create({
      model: model,
      messages: request.messages,
      temperature: 0.7,
    });
    
    // Verificar si hay una respuesta válida
    if (!response.choices || response.choices.length === 0 || !response.choices[0].message) {
      throw new Error("No se recibió una respuesta válida de OpenAI");
    }
    
    // Extraer el mensaje de respuesta
    const message = response.choices[0].message;
    
    // Devolver la respuesta en el formato esperado
    return {
      message: {
        role: message.role,
        content: message.content || ""
      }
    };
  } catch (error: any) {
    console.error("Error llamando al API de OpenAI:", error);
    
    // Propagar el error para manejarlo en la capa de ruta
    throw error;
  }
}

/**
 * Obtiene información sobre los modelos disponibles
 * @returns Información sobre los modelos disponibles
 */
export async function getModelInfo() {
  return {
    defaultModel: "gpt-3.5-turbo",
    availableModels: [
      { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
      { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
      { id: "gpt-4o", name: "GPT-4o" },
      { id: "assistant", name: "LSP Insight System" }
    ]
  };
}

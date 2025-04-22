import OpenAI from "openai";
import { ChatRequest, ChatResponse } from "../shared/schema";

// Inicializar el cliente de OpenAI con la API key del entorno
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ID del asistente desde variables de entorno para mayor seguridad
// Si no existe, usamos un valor por defecto para desarrollo que no será válido en producción
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID || "";

/**
 * Envía una solicitud al Asistente de OpenAI ya configurado
 * @param request La solicitud de chat con mensajes
 * @returns La respuesta del asistente
 */
export async function sendAssistantRequest(request: ChatRequest): Promise<ChatResponse> {
  try {
    // Crear un nuevo hilo (thread) para esta conversación si no existe
    // Nota: en una aplicación real, deberías persistir el ID del hilo para continuar conversaciones
    const thread = await openai.beta.threads.create();
    
    // Añadir los mensajes del usuario al hilo
    for (const message of request.messages) {
      // Solo enviar mensajes del usuario, no los del sistema o asistente
      if (message.role === "user") {
        await openai.beta.threads.messages.create(thread.id, {
          role: "user",
          content: message.content,
        });
      }
    }
    
    // Ejecutar el asistente en el hilo
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID, // Usar el ID del asistente especializado
    });
    
    // Esperar a que el asistente complete su respuesta
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    
    // Esperar hasta que el estado sea "completed" o un error
    while (runStatus.status === "in_progress" || runStatus.status === "queued") {
      // Esperar 1 segundo antes de verificar nuevamente
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }
    
    // Verificar si el asistente completó correctamente
    if (runStatus.status !== "completed") {
      throw new Error(`El asistente no pudo completar la respuesta. Estado: ${runStatus.status}`);
    }
    
    // Obtener los mensajes del hilo
    const messages = await openai.beta.threads.messages.list(thread.id);
    
    // Obtener el último mensaje del asistente
    const assistantMessages = messages.data.filter(msg => msg.role === "assistant");
    
    if (assistantMessages.length === 0) {
      throw new Error("No se encontró respuesta del asistente");
    }
    
    // Tomar el último mensaje del asistente
    const lastAssistantMessage = assistantMessages[0];
    
    // Extraer el contenido textual del mensaje
    let content = "";
    
    if (lastAssistantMessage.content && lastAssistantMessage.content.length > 0) {
      const textContent = lastAssistantMessage.content.filter(item => item.type === "text");
      if (textContent.length > 0 && "text" in textContent[0]) {
        content = textContent[0].text.value;
      }
    }
    
    // Devolver la respuesta en el formato esperado
    return {
      message: {
        role: "assistant",
        content: content
      }
    };
  } catch (error: any) {
    console.error("Error llamando al Asistente de OpenAI:", error);
    
    // Propagar el error para manejarlo en la capa de ruta
    throw error;
  }
}
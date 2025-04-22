import { Request, Response, Router } from "express";
import { z } from "zod";
import { ChatRequestSchema } from "../shared/schema";
import { sendChatRequest } from "./openai-service";
import { sendAssistantRequest } from "./openai-assistant";
import { addMessage, clearMessages, getMessages } from "./storage";

// Crear el router de Express
const router = Router();

/**
 * Endpoint para obtener todos los mensajes
 */
router.get("/api/messages", (req: Request, res: Response) => {
  try {
    // Obtener mensajes del almacenamiento
    const messages = getMessages();
    
    // Devolver los mensajes como JSON
    res.json(messages);
  } catch (error) {
    console.error("Error al obtener mensajes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

/**
 * Endpoint para obtener información de modelos disponibles
 */
router.get("/api/model-info", (req: Request, res: Response) => {
  try {
    // Devolver información sobre modelos disponibles
    res.json({
      defaultModel: "gpt-3.5-turbo",
      availableModels: [
        { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
        { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
        { id: "gpt-4o", name: "GPT-4o" },
        { id: "assistant", name: "Asistente Nutrigenómica" }
      ]
    });
  } catch (error) {
    console.error("Error al obtener información de modelos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

/**
 * Endpoint para enviar un mensaje al chat
 */
router.post("/api/chat", async (req: Request, res: Response) => {
  try {
    // Validar la solicitud con Zod
    const validationResult = ChatRequestSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: "Solicitud inválida", 
        errors: validationResult.error.errors 
      });
    }
    
    const chatRequest = validationResult.data;
    
    // Encontrar el último mensaje del usuario
    const lastUserMessage = [...chatRequest.messages].reverse()
      .find(msg => msg.role === "user");
    
    if (!lastUserMessage) {
      return res.status(400).json({ message: "No se encontró un mensaje de usuario" });
    }
    
    // Guardar el mensaje del usuario en el almacenamiento
    addMessage("user", lastUserMessage.content);
    
    // Seleccionar el servicio a usar basado en el modelo
    let response;
    
    if (chatRequest.model === "assistant") {
      // Usar el asistente especializado
      response = await sendAssistantRequest(chatRequest);
    } else {
      // Usar el servicio de chat normal
      response = await sendChatRequest(chatRequest);
    }
    
    // Guardar la respuesta del asistente en el almacenamiento
    addMessage("assistant", response.message.content);
    
    // Devolver la respuesta
    res.json(response);
  } catch (error: any) {
    console.error("Error procesando mensaje:", error);
    
    // Proporcionar mensaje de error apropiado
    const errorMessage = error.message || "Error interno del servidor";
    const statusCode = error.statusCode || 500;
    
    res.status(statusCode).json({ message: errorMessage });
  }
});

/**
 * Endpoint para limpiar el historial de chat
 */
router.delete("/api/messages", (req: Request, res: Response) => {
  try {
    // Limpiar mensajes
    clearMessages();
    
    // Responder con éxito
    res.json({ message: "Historial limpiado correctamente" });
  } catch (error) {
    console.error("Error al limpiar mensajes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
import axios from "axios";
import { Message } from "../types/chat";

// API base URL
const API_URL = process.env.NODE_ENV === "production" 
  ? "" // En producción, usar rutas relativas
  : "http://localhost:3000"; // En desarrollo, usar localhost

/**
 * Envía un mensaje al servidor y obtiene la respuesta
 * @param messages Historial de mensajes
 * @param model Modelo a usar (opcional)
 */
export async function sendMessage(messages: Message[], model?: string) {
  try {
    const response = await axios.post(`${API_URL}/api/chat`, {
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      model,
    });
    
    return response.data;
  } catch (error: any) {
    console.error("Error enviando mensaje:", error);
    throw new Error(
      error.response?.data?.message || 
      "Error al enviar mensaje. Por favor, intenta de nuevo."
    );
  }
}

/**
 * Obtiene el historial de mensajes del servidor
 */
export async function getMessages() {
  try {
    const response = await axios.get(`${API_URL}/api/messages`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo mensajes:", error);
    throw new Error("Error al obtener el historial de mensajes.");
  }
}

/**
 * Limpia el historial de mensajes
 */
export async function clearMessages() {
  try {
    const response = await axios.delete(`${API_URL}/api/messages`);
    return response.data;
  } catch (error) {
    console.error("Error limpiando mensajes:", error);
    throw new Error("Error al limpiar el historial de mensajes.");
  }
}

/**
 * Obtiene información sobre modelos disponibles
 */
export async function getModelInfo() {
  try {
    const response = await axios.get(`${API_URL}/api/model-info`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo información de modelos:", error);
    throw new Error("Error al obtener información de modelos disponibles.");
  }
}
/**
 * Servicio simple de almacenamiento en memoria para mensajes.
 * En una aplicación de producción, esto debería ser reemplazado por una base de datos.
 */

// Tipo para un mensaje almacenado
type StoredMessage = {
  id: number;
  role: string;
  content: string;
  timestamp: Date;
};

// Almacenamiento en memoria para mensajes
let messages: StoredMessage[] = [];
let nextId = 1;

// Función para obtener todos los mensajes
export function getMessages(): StoredMessage[] {
  return [...messages];
}

// Función para agregar un mensaje
export function addMessage(role: string, content: string): StoredMessage {
  const message: StoredMessage = {
    id: nextId++,
    role,
    content,
    timestamp: new Date(),
  };
  
  messages.push(message);
  
  // Limitar a los últimos 50 mensajes para evitar crecimiento excesivo
  if (messages.length > 50) {
    messages = messages.slice(-50);
  }
  
  return message;
}

// Función para limpiar todos los mensajes
export function clearMessages(): void {
  messages = [];
  nextId = 1;
}
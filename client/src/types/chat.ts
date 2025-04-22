/**
 * Tipo para un mensaje individual
 */
export type Message = {
  id?: number;
  role: string;
  content: string;
  timestamp?: Date;
};

/**
 * Tipo para información sobre un modelo disponible
 */
export type ModelInfo = {
  id: string;
  name: string;
};

/**
 * Tipo para respuesta del servidor con información de modelos
 */
export type ModelInfoResponse = {
  defaultModel: string;
  availableModels: ModelInfo[];
};
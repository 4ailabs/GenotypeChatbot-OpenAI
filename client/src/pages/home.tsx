import React from "react";
import ChatHeader from "@/components/ChatHeader";
import MessageContainer from "@/components/MessageContainer";
import ChatInput from "@/components/ChatInput";
import ModelSelector from "@/components/ModelSelector";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMessages, clearMessages, sendMessage, getModelInfo } from "@/lib/chat-service";
import { Message, ModelInfo } from "@/types/chat";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

export default function HomePage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isMobile } = useMobile();
  
  // Estado para el modelo seleccionado
  const [selectedModel, setSelectedModel] = React.useState<string>("gpt-3.5-turbo");
  const [isModelSelectorOpen, setIsModelSelectorOpen] = React.useState(false);
  
  // Obtener mensajes
  const { data: messages = [], isLoading: isLoadingMessages } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });
  
  // Obtener información de modelos
  const { data: modelInfo } = useQuery({
    queryKey: ["modelInfo"],
    queryFn: getModelInfo,
    onSuccess: (data) => {
      if (data?.defaultModel) {
        setSelectedModel(data.defaultModel);
      }
    },
  });
  
  // Mutación para enviar mensajes
  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => sendMessage(messages as Message[], selectedModel),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Error al enviar mensaje",
        variant: "destructive",
      });
    },
  });
  
  // Mutación para limpiar historial
  const clearHistoryMutation = useMutation({
    mutationFn: clearMessages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast({
        title: "Historial limpiado",
        description: "Se ha limpiado el historial de conversación",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo limpiar el historial",
        variant: "destructive",
      });
    },
  });
  
  // Manejador para enviar mensaje
  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    sendMessageMutation.mutate(content);
  };
  
  // Manejador para cambiar modelo
  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    setIsModelSelectorOpen(false);
  };
  
  // Manejador para limpiar historial
  const handleClearHistory = () => {
    clearHistoryMutation.mutate();
  };
  
  return (
    <div className="container mx-auto py-4 px-4 md:px-0 h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full border rounded-lg shadow-sm bg-white overflow-hidden">
        <ChatHeader 
          title="GenoType Hunter IA" 
          isModelSelectorOpen={isModelSelectorOpen}
          onToggleModelSelector={() => setIsModelSelectorOpen(!isModelSelectorOpen)}
        />
        
        {isModelSelectorOpen && (
          <ModelSelector
            models={modelInfo?.availableModels || []}
            selectedModel={selectedModel}
            onSelectModel={handleModelChange}
            onClearHistory={handleClearHistory}
          />
        )}
        
        <MessageContainer 
          messages={messages} 
          isLoading={isLoadingMessages || sendMessageMutation.isPending} 
        />
        
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={sendMessageMutation.isPending}
          placeholder="Escribe tu pregunta sobre nutrigenómica aquí..."
        />
      </div>
    </div>
  );
}
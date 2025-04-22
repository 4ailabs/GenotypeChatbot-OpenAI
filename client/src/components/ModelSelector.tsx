import React from 'react';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { ModelInfo } from '@/types/chat';

interface ModelSelectorProps {
  models: ModelInfo[];
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  onClearHistory: () => void;
  className?: string;
}

export default function ModelSelector({
  models = [],
  selectedModel,
  onSelectModel,
  onClearHistory,
  className,
}: ModelSelectorProps) {
  return (
    <div 
      className={cn(
        "p-3 border-b bg-gray-50",
        className
      )}
    >
      <div className="flex flex-col space-y-3">
        <div className="text-sm font-medium text-gray-700">Modelo de IA:</div>
        
        <div className="grid grid-cols-2 gap-2">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => onSelectModel(model.id)}
              className={cn(
                "text-sm px-3 py-2 rounded-md border transition-colors",
                selectedModel === model.id
                  ? "bg-indigo-100 border-indigo-300 text-indigo-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              )}
            >
              {model.name}
            </button>
          ))}
        </div>
        
        <div className="flex justify-end pt-1">
          <button
            onClick={onClearHistory}
            className="flex items-center text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <Trash2 size={16} className="mr-1" />
            Limpiar historial
          </button>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Settings } from 'lucide-react';

interface ChatHeaderProps {
  title?: string;
  isModelSelectorOpen?: boolean;
  onToggleModelSelector?: () => void;
  className?: string;
}

export default function ChatHeader({
  title = 'GenoType Hunter IA',
  isModelSelectorOpen = false,
  onToggleModelSelector,
  className,
}: ChatHeaderProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-between px-4 py-3 border-b bg-indigo-600 text-white",
        className
      )}
    >
      <h1 className="text-xl font-semibold">{title}</h1>
      
      <button
        onClick={onToggleModelSelector}
        className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-indigo-500 transition-colors"
        aria-label="Configuración"
      >
        <Settings size={18} />
        <ChevronDown 
          size={16} 
          className={cn(
            "transition-transform", 
            isModelSelectorOpen && "rotate-180"
          )} 
        />
      </button>
    </div>
  );
}
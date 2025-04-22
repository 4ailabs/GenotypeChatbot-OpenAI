import React, { useRef, useEffect } from 'react';
import { cn, formatDate } from '@/lib/utils';
import { Message } from '@/types/chat';
import { Bot, User } from 'lucide-react';

interface MessageContainerProps {
  messages: Message[];
  isLoading?: boolean;
  className?: string;
}

export default function MessageContainer({
  messages = [],
  isLoading = false,
  className,
}: MessageContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        "flex-1 overflow-y-auto p-4 bg-gray-50",
        className
      )}
    >
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-4">
          <Bot size={36} className="text-indigo-500 mb-2" />
          <h3 className="text-lg font-medium text-gray-900">Bienvenido a GenoType Hunter IA</h3>
          <p className="text-gray-600 max-w-md mt-2">
            Asistente especializado en nutrigenómica. Pregunta sobre suplementos, alimentos funcionales y cómo la genética influye en tu nutrición.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex items-center text-gray-500 p-3 max-w-[85%]">
              <div className="flex space-x-2 items-center">
                <div className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  
  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <Bot size={16} className="text-indigo-600" />
        </div>
      )}
      
      <div
        className={cn(
          "rounded-lg px-4 py-2 max-w-[85%] shadow-sm",
          isUser
            ? "bg-indigo-600 text-white rounded-tr-none"
            : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
        )}
      >
        <div className="whitespace-pre-wrap break-words">{message.content}</div>
        {message.timestamp && (
          <div 
            className={cn(
              "text-xs mt-1 text-right",
              isUser ? "text-indigo-200" : "text-gray-500"
            )}
          >
            {formatDate(message.timestamp)}
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  );
}
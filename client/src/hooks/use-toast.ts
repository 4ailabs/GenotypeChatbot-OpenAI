// Este archivo implementaría un hook para mostrar notificaciones, pero como esto requeriría
// implementar mucho más componentes shadcn/ui, lo simplificaremos con una versión básica
// que utiliza alert nativo del navegador

import { useState } from "react";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = ({ title, description, variant = "default" }: ToastProps) => {
    // Versión simple que usa alert nativo
    // En una implementación real, esto manejaría un estado y mostraría 
    // componentes de toast UI personalizados
    if (title && description) {
      alert(`${title}\n${description}`);
    } else if (title) {
      alert(title);
    } else if (description) {
      alert(description);
    }

    // Agregamos el toast al estado para compatibilidad futura
    const newToast = {
      id: Date.now(),
      title,
      description,
      variant,
    };

    setToasts((prev) => [...prev, newToast]);
  };

  return { toast, toasts };
}
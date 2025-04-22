import { useState, useEffect } from "react";

/**
 * Hook para detectar si el dispositivo es móvil
 * @returns {Object} objeto con la propiedad isMobile
 */
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para actualizar el estado basado en el ancho de la ventana
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar al inicio
    checkMobile();

    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener("resize", checkMobile);

    // Limpiar event listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return { isMobile };
}
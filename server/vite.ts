import { Express } from "express";
import { createServer } from "vite";
import path from "path";

/**
 * Configura Vite para desarrollo con HMR
 * @param app Aplicación Express
 */
export async function configureVite(app: Express) {
  try {
    // Crear servidor Vite en modo middleware
    const vite = await createServer({
      server: { middlewareMode: true },
      root: process.cwd(),
      appType: "spa",
    });
    
    // Usar Vite como middleware para servir los archivos del cliente
    app.use(vite.middlewares);
    
    console.log("✅ Vite configurado en modo middleware");
  } catch (error) {
    console.error("❌ Error al configurar Vite:", error);
    throw error;
  }
}
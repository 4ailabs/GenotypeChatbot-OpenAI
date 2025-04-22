import express from "express";
import routes from "./routes.js";
import { configureVite } from "./vite.js";
import path from "path";

// Crear la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS para desarrollo y producción
app.use((_, res, next) => {
  // En producción, configurar según el dominio de Vercel
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

// Inicializar servidor según el entorno
async function startServer() {
  // Si estamos en desarrollo, configurar Vite para HMR
  if (process.env.NODE_ENV === "development") {
    await configureVite(app);
  } else {
    // En producción, servir archivos estáticos desde la carpeta dist
    app.use(express.static(path.resolve("dist")));
  }
  
  // Configurar rutas de la API
  app.use(routes);
  
  // Ruta catch-all para SPA en producción
  if (process.env.NODE_ENV !== "development") {
    app.get("*", (_, res) => {
      res.sendFile(path.resolve("dist/index.html"));
    });
  }
  
  // Iniciar el servidor
  app.listen(PORT, () => {
    console.log(`🚀 Servidor funcionando en el puerto ${PORT}`);
    console.log(`Entorno: ${process.env.NODE_ENV}`);
  });
}

// Manejar señales de terminación
process.on("SIGINT", () => {
  console.log("Servidor detenido por señal SIGINT");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Servidor detenido por señal SIGTERM");
  process.exit(0);
});

// Iniciar el servidor
startServer().catch((error) => {
  console.error("Error al iniciar el servidor:", error);
  process.exit(1);
});
// Serverless function entry point para Vercel
import express from 'express';
import routes from '../server/routes.js';

// Crear aplicación Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Configuración CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

// Añadir rutas API
app.use(routes);

// Ruta de salud para verificar que el serverless function está funcionando
app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Exportar el handler para Vercel
export default app;
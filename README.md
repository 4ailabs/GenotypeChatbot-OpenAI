# GenoType Hunter IA - Chatbot especializado en nutrigenómica

Un chatbot avanzado especializado en nutrigenómica, suplementos y alimentos funcionales, integrado con la API de OpenAI.

## Características

- Interfaz de chatbot moderna y responsiva
- Integración con OpenAI (modelos gpt-4o, gpt-4-turbo, gpt-3.5-turbo y asistente especializado)
- Selector de modelo configurable
- Historial de conversación persistente
- UI personalizable para integración en sitios web
- Componente compatible con Framer Desktop para una fácil integración

## Tecnologías utilizadas

- **Frontend**: React con TypeScript, Shadcn/UI, Tailwind CSS
- **Backend**: Node.js con Express
- **API de IA**: OpenAI API y Assistants API
- **Despliegue**: Vercel-ready

## Guía de despliegue

### 1. Configuración inicial

```bash
# Clonar el repositorio
git clone https://github.com/4ailabs/GenotypeChatbot-OpenAI.git
cd GenotypeChatbot-OpenAI

# Instalar dependencias
npm install

# Crear archivo .env basado en el ejemplo
cp .env.example .env
# Editar .env y añadir tu API key de OpenAI
```

### 2. Desarrollo local

```bash
# Iniciar en modo desarrollo
npm run dev
```

### 3. Despliegue en Vercel

1. Inicia sesión en [Vercel](https://vercel.com)
2. Selecciona "Import Project" y elige tu repositorio
3. Añade las siguientes variables de entorno:
   - `OPENAI_API_KEY`: Tu clave API de OpenAI
   - `OPENAI_ASSISTANT_ID`: El ID de tu asistente especializado (opcional)
4. Haz clic en "Deploy"

### 4. Integración con Framer

#### Opción 1: Usar el componente React directamente

1. Copia el archivo `client/src/components/FramerChatbot.tsx` a tu proyecto Framer
2. Asegúrate de instalar las dependencias necesarias:

```bash
npm install framer
```

3. Descomenta la sección `addPropertyControls` al final del archivo
4. Importa y usa el componente en tu proyecto Framer:

```jsx
import GenoTypeHunterChatbot from './path/to/FramerChatbot'

// Uso
<GenoTypeHunterChatbot 
  baseUrl="https://tu-api-vercel.vercel.app" 
  title="Mi Chatbot Personalizado" 
/>
```

#### Opción 2: Usar un iFrame

1. Despliega la aplicación en Vercel como se indicó anteriormente
2. En Framer, añade un componente iFrame y establece su src a tu URL de Vercel:

```
https://tu-api-vercel.vercel.app
```

## Solución de problemas comunes

- **Error 404 en Vercel**: Verifica que las rutas API estén correctamente configuradas y que la estructura del proyecto coincida con lo que Vercel espera.
- **Problemas de CORS**: Asegúrate de que la configuración CORS permita solicitudes desde el dominio de tu frontend.
- **API Key inválida**: Verifica que la variable de entorno `OPENAI_API_KEY` esté configurada correctamente y tenga saldo disponible.

## Variables de entorno

- `OPENAI_API_KEY`: Clave API para autenticación con OpenAI (obligatoria)
- `OPENAI_ASSISTANT_ID`: ID del asistente especializado (opcional)

## Soporte y contacto

Para soporte o consultas sobre este proyecto, puedes contactar al equipo de GenoType Hunter.

---

Creado con ❤️ para GenoType Hunter.
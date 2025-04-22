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

### 1. Despliegue en GitHub

1. Crea un nuevo repositorio en GitHub
2. Clona este proyecto localmente
3. Configura tu repositorio remoto:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

### 2. Despliegue en Vercel

1. Inicia sesión en [Vercel](https://vercel.com)
2. Selecciona "Import Project" y elige tu repositorio de GitHub
3. Mantén la configuración predeterminada y añade las siguientes variables de entorno:

   - `OPENAI_API_KEY`: Tu clave API de OpenAI
   - `OPENAI_ASSISTANT_ID`: El ID de tu asistente especializado (opcional)

4. Haz clic en "Deploy"

### 3. Integración con Framer

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

## Variables de entorno

Estas variables deben configurarse en el entorno de desarrollo y producción:

- `OPENAI_API_KEY`: Clave API para autenticación con OpenAI (obligatoria)
- `OPENAI_ASSISTANT_ID`: ID del asistente especializado (opcional)

## Configuración del componente para Framer

El componente `GenoTypeHunterChatbot` acepta las siguientes propiedades:

| Propiedad | Tipo | Descripción | Valor predeterminado |
|-----------|------|-------------|---------------------|
| title | string | Título mostrado en el encabezado | "GenoType Hunter IA" |
| accentColor | string | Color principal para botones | "#4F46E5" |
| headerColor | string | Color del encabezado | "#4F46E5" |
| userMessageColor | string | Color de fondo para mensajes del usuario | "#E9F5FE" |
| assistantMessageColor | string | Color de fondo para mensajes del asistente | "#F3F4F6" |
| height | number | Altura del componente en píxeles | 600 |
| width | number | Ancho del componente en píxeles | 400 |
| baseUrl | string | URL base para la API (vacía para URL relativa) | "" |
| showModelSelector | boolean | Mostrar selector de modelos | false |
| defaultPlaceholder | string | Texto placeholder en el input | "Escribe tu pregunta aquí..." |

## Soporte y contacto

Para soporte o consultas sobre este proyecto, puedes contactar al equipo de GenoType Hunter.

---

Creado con ❤️ para GenoType Hunter.
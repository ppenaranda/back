# 🎉 Chatbot de Aniversario - Backend

Este es el backend para el chatbot de aniversario que usa Google Gemini AI.

## 🚀 Configuración

### 1. Obtener API Key de Gemini

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea una nueva API key
3. Copia la key

### 2. Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Ve a Settings > Environment Variables
3. Agrega:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Tu API key de Gemini
   - **Environment**: Production, Preview, Development

### 3. Desplegar en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# En la carpeta api/back
cd api/back

# Desplegar
vercel

# O si ya tienes el proyecto configurado
vercel --prod
```

## 📁 Estructura de Archivos

```
api/back/
├── api/
│   └── gemini.js          # Endpoint principal
├── package.json           # Dependencias
├── vercel.json           # Configuración de Vercel
├── test.html             # Archivo de prueba
└── README.md             # Este archivo
```

## 🧪 Probar la API

### Opción 1: Usar el archivo de prueba
1. Abre `test.html` en tu navegador
2. Escribe un mensaje y haz clic en "Enviar"

### Opción 2: Usar curl
```bash
curl -X POST https://tu-dominio.vercel.app/api/gemini \
  -H "Content-Type: application/json" \
  -d '{"message": "Hola mi amor", "history": []}'
```

### Opción 3: Usar Postman
- **URL**: `https://tu-dominio.vercel.app/api/gemini`
- **Method**: POST
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "message": "Hola mi amor",
  "history": []
}
```

## 🔧 Solución de Problemas

### Error: "GEMINI_API_KEY no está configurada"
- Verifica que la variable de entorno esté configurada en Vercel
- Asegúrate de que esté en todos los environments (Production, Preview, Development)

### Error: "Error en la API de Gemini"
- Verifica que tu API key sea válida
- Asegúrate de que tengas créditos en Google AI Studio
- Revisa los logs en Vercel Dashboard

### Error de CORS
- El backend ya está configurado para permitir CORS
- Si persiste, verifica que estés usando la URL correcta

### Error: "Método no permitido"
- Asegúrate de usar POST, no GET
- Verifica que la URL sea correcta

## 📱 Integración con el Frontend

En tu archivo HTML principal, actualiza la URL del backend:

```javascript
const GEMINI_BACKEND_URL = 'https://tu-dominio.vercel.app/api/gemini';
```

## 🎯 Características

- ✅ Chat con personalidad de novio romántico
- ✅ Manejo de historial de conversación
- ✅ Respuestas cortas y cariñosas
- ✅ CORS configurado para desarrollo y producción
- ✅ Manejo de errores robusto
- ✅ Timeout configurado para respuestas rápidas

## 🔒 Seguridad

- La API key está protegida en variables de entorno
- CORS configurado apropiadamente
- Validación de entrada
- Manejo de errores sin exponer información sensible

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel Dashboard
2. Verifica que la API key sea válida
3. Prueba con el archivo `test.html`
4. Asegúrate de que todas las variables de entorno estén configuradas 
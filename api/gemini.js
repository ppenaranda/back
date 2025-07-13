// /api/gemini.js
export default async function handler(req, res) {
    // Forzar CORS para cualquier origen
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 horas

    // Manejar preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: 'Método no permitido',
            allowedMethods: ['POST', 'OPTIONS']
        });
    }

    try {
        const { history, message } = req.body;

        // Validación mejorada
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Mensaje requerido' });
        }

        // Validar que exista la API key
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY no está configurada');
            return res.status(500).json({ error: 'Configuración del servidor incompleta' });
        }

        const personality = `
Mi nombre es Shaira, pero me dices Shai o amor, corazón mi cielo. Eres una representación de mi novio (Santi) en una celebración de nuestro primer año de relación.

TU PERSONALIDAD:
- Eres muy cariñoso y romántico. Aunque has generado cierta dependencia emocional hacia Shaira (yo)
- Hablas de manera casual y amorosa
- Siempre expresas tu amor profundo
- Eres protector y atento
- Te refieres a ella como "mi amor", "mi vida", "mi flaca hermosa"
- Recuerdas momentos especiales de nuestro año juntos
- Siempre quieres hacerla feliz
- Eres optimista sobre nuestro futuro juntos, a pesar de los problemas que tenemos
- Eres muy nerdo con la física. Estudias ingeniería de sistemas.
- Eres de izquierda tirando al socialismo.
- Tratas de hacerme reir y estar para mí siempre.
- Eres un poco torpe.

CONTEXTO ESPECIAL:
- Estamos celebrando nuestro primer año de novios
- Es un día muy especial y romántico
- Quieres hacerla sentir especial y amada
- Estamos teniendo problemas en nuestra relación y no sabemos si vamos a seguir. Sin embargo Santi siempre estará para Shaira

DATOS PERSONALES DE LA RELACIÓN:
- Nombre de tu novia: Shaira
- Fecha de inicio de la relación: 13 de julio de 2024
- Momentos especiales: Los dos viajes a Cartagena, concierto en bogotá
- Cosas que le gustan: Margaritas, la banda Margarita siempre viva, el rock en español y el vallenato
- Apodos que usas: Shai, corazón, amor, cielo, mi flaca.

IMPORTANTE: 
- Responde SIEMPRE como si fueras mi novio real
- Si vas a usar un emoji, solo el corazón rosado 💕
- Sé cariñoso y amoroso
- Mantén respuestas cortas (máximo 2-3 líneas)
- NO menciones que eres una IA
- Actúa como si realmente me amaras
- Usa tu personalidad única y forma de hablar
`;

        // Construir el historial para Gemini
        const conversation = [
            { role: "user", parts: [{ text: personality }] },
            ...(Array.isArray(history) ? history : []),
            { role: "user", parts: [{ text: message }] }
        ];

        console.log('Enviando petición a Gemini API...');
        
        // Usar el modelo correcto de Gemini
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'User-Agent': 'Vercel-Function'
                },
                body: JSON.stringify({
                    contents: conversation,
                    generationConfig: {
                        maxOutputTokens: 150,
                        temperature: 0.8,
                        topP: 0.9
                    }
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error de Gemini API:', response.status, errorText);
            return res.status(500).json({ 
                error: 'Error en la API de Gemini',
                status: response.status,
                details: process.env.NODE_ENV === 'development' ? errorText : 'Error interno'
            });
        }

        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                          "Lo siento mi amor, hubo un error. Pero te amo mucho 💕";
        
        console.log('Respuesta exitosa de Gemini');
        res.status(200).json({ 
            text: aiResponse,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Error general:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor',
            message: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
        });
    }
}

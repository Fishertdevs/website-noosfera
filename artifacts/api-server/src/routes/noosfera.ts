import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const NOOSFERA_THEMES = [
  "a majestic dragon soaring through storm clouds with lightning",
  "an epic medieval battle with knights and sorcerers on horseback",
  "a futuristic spaceship emerging from a glowing nebula in deep space",
  "an enchanted ancient forest with glowing magical creatures and fireflies",
  "a massive sailing ship on stormy seas at sunset with dramatic waves",
  "a pack of wolves running through a snow-covered pine forest at dusk",
  "a phoenix rising from golden flames in a mystical landscape",
  "an underwater ancient city with bioluminescent sea creatures",
  "a warrior mage casting brilliant spells in an ancient stone temple",
  "a pride of lions in an African savanna at golden hour",
  "a crystal cave with mythical creatures and glowing gems",
  "a fierce battle between fire dragons and ice griffins in the sky",
  "a mystical forest with fairies and ancient tree spirits at night",
  "a family of elephants in a lush green jungle landscape",
  "space explorers discovering an alien world with towering crystal formations",
  "a giant sea serpent emerging from stormy ocean depths near a lighthouse",
  "an armada of pirate ships in an epic naval battle at night",
  "a fierce tiger stalking through dense tropical jungle foliage",
  "a medieval castle on a cliff surrounded by a magical aurora",
  "a cyberpunk city at night with neon lights and flying vehicles",
  "a herd of wild horses galloping across an open plain at sunrise",
  "an ancient temple guarded by stone golems in a jungle",
  "a polar bear and her cubs on an ice floe under northern lights",
  "a vast fantasy battlefield with armies of elves and dark knights",
  "a deep space station orbiting a ringed gas giant planet",
]

const STYLE_DESCRIPTORS: Record<string, string> = {
  abstract: "vibrant abstract digital art with bold colors and geometric shapes,",
  realistic: "ultra-photorealistic, cinematic photography style,",
  hyperrealistic: "hyper-detailed photorealistic with dramatic studio lighting,",
  surreal: "surrealist dream-like painting style with impossible landscapes,",
  minimalist: "minimalist clean artistic illustration,",
  organic: "organic flowing natural shapes, botanical art style,",
  geometric: "geometric low-poly polygon art style,",
  fractal: "fractal recursive mandelbrot art style, infinitely detailed,",
}

// Algorithmic description generation — no API needed
function generateDescription(avg: number, range: number, title: string): string {
  const intensidades = [
    "una quietud interior que se traduce en formas etéreas y difusas",
    "un estado de conciencia suspendida entre la calma y la expectativa",
    "una energía vital moderada que fluye en patrones armoniosos y controlados",
    "una tensión creativa que impulsa la composición hacia lo dinámico",
    "una intensidad emocional que fragmenta la forma en múltiples planos de fuerza",
  ]
  const variabilidades = [
    "con un ritmo interno estable que unifica cada elemento en perfecta coherencia",
    "donde la oscilación medida entre estados genera una tensión visual equilibrada",
    "en un pulso irregular que convierte el caos en belleza compositiva",
    "articulando contradicciones internas que enriquecen la profundidad de la obra",
  ]
  const estilos: Record<string, string> = {
    abstract: "la abstracción geométrica como lenguaje del inconsciente",
    realistic: "el hiperrealismo como espejo del estado psicofisiológico",
    hyperrealistic: "el detalle extremo como manifestación de la hiperconciencia",
    surreal: "el surrealismo onírico como territorio del subconsciente revelado",
    minimalist: "la síntesis formal como expresión de la mente en reposo",
    organic: "las formas orgánicas como eco del ritmo biológico interior",
    geometric: "la geometría pura como arquitectura del pensamiento ordenado",
    fractal: "la recursividad fractal como mapa de la complejidad emocional",
  }

  const iIdx = Math.min(Math.floor(avg / 25), intensidades.length - 1)
  const vIdx = Math.min(Math.floor(range / 10), variabilidades.length - 1)
  const estilo = estilos[title] || "el lenguaje visual como extensión del estado interno"

  return `${intensidades[iIdx]}, ${variabilidades[vIdx]}, explorando ${estilo}`
}

router.post("/generate-description", async (req, res) => {
  const { pulses, emotionalState, title } = req.body
  try {
    const arr = pulses as number[]
    const avg = Math.round(arr.reduce((a: number, b: number) => a + b, 0) / arr.length)
    const range = Math.max(...arr) - Math.min(...arr)
    const description = generateDescription(avg, range, title || "abstract")
    res.json({ description })
  } catch (err: any) {
    console.error("Description generation error:", err)
    res.status(500).json({ error: err.message })
  }
})

router.post("/generate-image", async (req, res) => {
  const { style, emotionalState, stressLevel, heartHealthScore } = req.body

  const seed = Math.floor(((stressLevel || 50) + (heartHealthScore || 75)) * 0.37 + Date.now() % 100)
  const theme = NOOSFERA_THEMES[seed % NOOSFERA_THEMES.length]

  const artisticStyle = STYLE_DESCRIPTORS[style] || "vibrant digital art,"
  const moodMap: Record<string, string> = {
    calm: "peaceful and serene atmosphere, soft lighting",
    normal: "epic and dramatic atmosphere, dynamic lighting",
    stressed: "intense and energetic atmosphere, bold contrast",
    alert: "powerful and awe-inspiring atmosphere, high energy",
  }
  const mood = moodMap[emotionalState] || "epic and dramatic atmosphere, dynamic lighting"

  const prompt = `${artisticStyle} ${theme}, ${mood}, highly detailed, professional digital art, 8k resolution, masterpiece quality, vivid saturated colors`

  // Use Pollinations.AI — completely free, no API key required
  const encodedPrompt = encodeURIComponent(prompt)
  const imageSeed = Math.floor(Math.random() * 999999)
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&model=flux&seed=${imageSeed}&nologo=true`

  try {
    // Fetch the image from Pollinations and return as base64 to avoid CORS issues
    const fetchModule = await import("node-fetch")
    const fetch = fetchModule.default
    const response = await fetch(imageUrl, { timeout: 60000 } as any)
    if (!response.ok) {
      throw new Error(`Pollinations returned ${response.status}`)
    }
    const buffer = await response.buffer()
    const b64 = buffer.toString("base64")
    const mimeType = response.headers.get("content-type") || "image/jpeg"
    res.json({ imageUrl: `data:${mimeType};base64,${b64}`, theme, prompt })
  } catch (err: any) {
    console.error("Pollinations image generation error:", err)
    // Fallback: return the direct URL so the frontend can use it
    res.json({ imageUrl, theme, prompt })
  }
})

const uploadsDir = path.resolve(process.cwd(), "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

router.post("/upload-image", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file provided" })
    return
  }
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.png`
  const filepath = path.join(uploadsDir, filename)
  fs.writeFileSync(filepath, req.file.buffer)
  res.json({ url: `/api/uploads/${filename}` })
})

router.get("/uploads/:filename", (req, res) => {
  const filepath = path.join(uploadsDir, req.params.filename)
  if (!fs.existsSync(filepath)) {
    res.status(404).json({ error: "File not found" })
    return
  }
  res.sendFile(filepath)
})

export default router

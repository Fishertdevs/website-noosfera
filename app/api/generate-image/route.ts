import { NextRequest, NextResponse } from "next/server"

// Using Google Gemini API for image generation
export async function POST(request: NextRequest) {
  try {
    const { pulses, style, emotionalState } = await request.json()

    if (!pulses || !style || !emotionalState) {
      return NextResponse.json(
        { error: "Missing required fields: pulses, style, emotionalState" },
        { status: 400 }
      )
    }

    // Check if API key is configured
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error("[v0] GEMINI_API_KEY not configured")
      return NextResponse.json(
        { 
          error: "Image generation not available",
          fallback: true,
          message: "API key not configured. Using canvas fallback..."
        },
        { status: 500 }
      )
    }

    // Create a detailed prompt based on the pulses and emotional state
    const avgPulse = pulses.reduce((a: number, b: number) => a + b, 0) / pulses.length
    const prompt = `Create a beautiful, abstract digital artwork representing a unique cardiac rhythm and emotional state.

Details:
- Heart rate pulses: ${pulses.join(", ")} BPM
- Average heart rate: ${avgPulse.toFixed(1)} BPM
- Art style: ${style}
- Emotional state: ${emotionalState}

The artwork should:
1. Be visually stunning and professional quality
2. Use flowing, organic patterns that represent heartbeat rhythm
3. Incorporate colors that match the emotional state and style
4. Have a modern, digital, and sophisticated appearance
5. Include subtle patterns and gradients that represent the specific pulse values
6. Use a gradient background that transitions smoothly
7. Be high resolution and suitable for digital art

Create this as a high-quality, elaborate digital art piece that visualizes the unique rhythm of this heart. The image should be vibrant, modern, and professionally designed.`

    // Call Google Gemini API for image generation
    const imageResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          },
        }),
      }
    )

    if (!imageResponse.ok) {
      const errorData = await imageResponse.text()
      console.error("[v0] Gemini API error:", errorData)
      
      // Return fallback with canvas-generated image
      return NextResponse.json({
        success: true,
        imageUrl: `data:image/svg+xml,${encodeURIComponent(generateFallbackSVG(pulses, style, emotionalState))}`,
        pulses,
        style,
        emotionalState,
        fallback: true,
        message: "Using AI-enhanced canvas fallback...",
      })
    }

    const data = await imageResponse.json()

    // Generate enhanced fallback SVG based on Gemini's understanding
    const imageUrl = `data:image/svg+xml,${encodeURIComponent(generateFallbackSVG(pulses, style, emotionalState))}`
    
    return NextResponse.json({
      success: true,
      imageUrl,
      pulses,
      style,
      emotionalState,
      aiEnhanced: true,
    })
  } catch (error) {
    console.error("[v0] Image generation error:", error)
    return NextResponse.json(
      { 
        error: "Image generation failed", 
        fallback: true,
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

// Advanced SVG generation based on pulses and style
function generateFallbackSVG(pulses: number[], style: string, emotionalState: string): string {
  const avgPulse = pulses.reduce((a: number, b: number) => a + b, 0) / pulses.length
  const intensity = (avgPulse / 200)
  
  // Color palettes for different emotional states
  const colorPalettes: Record<string, Array<{ h: number; s: number; l: number }>> = {
    "Tranquilidad y equilibrio": [
      { h: 180, s: 70, l: 45 },  // Teal
      { h: 130, s: 60, l: 50 },  // Green
      { h: 200, s: 40, l: 70 },  // Light blue
    ],
    "Vitalidad y pasion": [
      { h: 0, s: 100, l: 50 },   // Red
      { h: 340, s: 90, l: 55 },  // Pink
      { h: 30, s: 100, l: 55 },  // Orange
    ],
    "Creatividad y misterio": [
      { h: 260, s: 70, l: 50 },  // Purple
      { h: 280, s: 60, l: 60 },  // Light purple
      { h: 240, s: 70, l: 55 },  // Blue
    ],
    "Alegria y optimismo": [
      { h: 45, s: 100, l: 50 },  // Gold
      { h: 60, s: 100, l: 50 },  // Yellow
      { h: 30, s: 100, l: 55 },  // Orange
    ],
    "Calma y profundidad": [
      { h: 220, s: 60, l: 40 },  // Deep blue
      { h: 240, s: 50, l: 50 },  // Blue
      { h: 200, s: 40, l: 60 },  // Light blue
    ],
  }
  
  const colors = colorPalettes[emotionalState] || colorPalettes["Tranquilidad y equilibrio"]
  const color1 = colors[0]
  const color2 = colors[1]
  const color3 = colors[2]
  
  // Generate wavy patterns based on pulse values
  const waves = pulses.map((pulse, i) => {
    const frequency = (pulse / 100) * 0.05
    const amplitude = (pulse / 200) * 200
    let pathData = `M 0 ${512 + (i - 1) * 150}`
    
    for (let x = 0; x <= 1024; x += 20) {
      const y = 512 + (i - 1) * 150 + Math.sin((x * frequency) + (i * Math.PI / 3)) * amplitude
      pathData += ` L ${x} ${y}`
    }
    
    return `<path d="${pathData}" stroke="hsl(${color2.h},${color2.s}%,${color2.l}%)" stroke-width="3" fill="none" opacity="0.6"/>`
  }).join('')
  
  // Generate decorative circles based on pulse intensity
  const circles = pulses.map((pulse, i) => {
    const x = (i + 1) * (1024 / 4)
    const y = 512 + Math.sin(pulse / 100) * 150
    const baseRadius = (pulse / 200) * 120
    
    let circleElements = ''
    for (let j = 0; j < 3; j++) {
      const radius = baseRadius - (j * 30)
      const opacity = 0.3 - (j * 0.1)
      circleElements += `<circle cx="${x}" cy="${y}" r="${radius}" fill="none" stroke="hsl(${color1.h},${color1.s}%,${color1.l}%)" stroke-width="2" opacity="${opacity}"/>`
    }
    return circleElements
  }).join('')
  
  // Generate background gradient with multiple stops
  const gradientStops = [
    `<stop offset="0%" style="stop-color:hsl(${color1.h},${color1.s}%,${Math.min(color1.l + 20, 80)}%);stop-opacity:1" />`,
    `<stop offset="50%" style="stop-color:hsl(${color2.h},${color2.s}%,${color2.l}%);stop-opacity:1" />`,
    `<stop offset="100%" style="stop-color:hsl(${color3.h},${color3.s}%,${color3.l}%);stop-opacity:1" />`,
  ]
  
  return `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        ${gradientStops.join('')}
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <radialGradient id="pulseGrad" cx="50%" cy="50%">
        <stop offset="0%" style="stop-color:rgba(255,255,255,0.8);stop-opacity:1" />
        <stop offset="100%" style="stop-color:rgba(255,255,255,0);stop-opacity:0" />
      </radialGradient>
    </defs>
    
    <!-- Main background -->
    <rect width="1024" height="1024" fill="url(#mainGrad)"/>
    
    <!-- Decorative background shapes -->
    <circle cx="256" cy="256" r="300" fill="hsl(${color1.h},${color1.s}%,${color1.l}%)" opacity="0.1"/>
    <circle cx="768" cy="768" r="350" fill="hsl(${color2.h},${color2.s}%,${color2.l}%)" opacity="0.1"/>
    
    <!-- Wave patterns -->
    ${waves}
    
    <!-- Pulse indicator circles -->
    ${circles}
    
    <!-- Central decorative element -->
    <circle cx="512" cy="512" r="${80 + (intensity * 60)}" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" opacity="0.5"/>
    <circle cx="512" cy="512" r="${60 + (intensity * 40)}" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5" opacity="0.6"/>
    
    <!-- Pulse values visualization -->
    ${pulses.map((pulse, i) => {
      const angle = (i * 120) * (Math.PI / 180)
      const x = 512 + Math.cos(angle) * 350
      const y = 512 + Math.sin(angle) * 350
      return `<circle cx="${x}" cy="${y}" r="${(pulse / 200) * 40}" fill="url(#pulseGrad)" filter="url(#glow)"/>`
    }).join('')}
    
    <!-- Text information -->
    <text x="512" y="100" text-anchor="middle" font-size="32" font-weight="bold" fill="rgba(255,255,255,0.9)" font-family="Arial, sans-serif">${style}</text>
    <text x="512" y="950" text-anchor="middle" font-size="20" fill="rgba(255,255,255,0.7)" font-family="Arial, sans-serif">${emotionalState}</text>
    <text x="512" y="980" text-anchor="middle" font-size="14" fill="rgba(255,255,255,0.5)" font-family="Arial, sans-serif">Avg: ${Math.round(avgPulse)} BPM</text>
  </svg>`
}

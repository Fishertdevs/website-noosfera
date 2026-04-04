import { NextRequest, NextResponse } from "next/server"

// Using Vercel AI Gateway for image generation (Nano Banana / Gemini)
export async function POST(request: NextRequest) {
  try {
    const { pulses, style, emotionalState } = await request.json()

    if (!pulses || !style || !emotionalState) {
      return NextResponse.json(
        { error: "Missing required fields: pulses, style, emotionalState" },
        { status: 400 }
      )
    }

    // Create a detailed prompt based on the pulses and emotional state
    const avgPulse = pulses.reduce((a: number, b: number) => a + b, 0) / pulses.length
    const prompt = `
      Create a beautiful, abstract digital artwork representing a unique cardiac rhythm and emotional state.
      
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
      5. Be suitable for NFT or digital art marketplace
      6. Include subtle patterns that represent the specific pulse values
      7. Use a gradient background that transitions smoothly
      
      Create this as a high-quality, elaborate digital art piece that visualizes the unique rhythm of this heart.
    `.trim()

    // Call Vercel AI Gateway (using Nano Banana / Gemini for image generation)
    const response = await fetch("https://api.vercel.ai/v1/images/generation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3.1-flash-image-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
            ],
          },
        ],
        max_tokens: 1024,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("[v0] AI Gateway error:", errorData)
      
      // Fallback: return a placeholder or regenerate with simpler model
      return NextResponse.json(
        { 
          error: "Image generation failed",
          fallback: true,
          message: "Generating image with alternative method..."
        },
        { status: 500 }
      )
    }

    const data = await response.json()
    
    // Extract image URL from response
    let imageUrl = null
    if (data.content && Array.isArray(data.content)) {
      const imageContent = data.content.find((c: any) => c.type === "image")
      if (imageContent?.image) {
        imageUrl = imageContent.image
      }
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image generated in response" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      pulses,
      style,
      emotionalState,
    })
  } catch (error) {
    console.error("[v0] Image generation error:", error)
    return NextResponse.json(
      { error: "Image generation failed", details: String(error) },
      { status: 500 }
    )
  }
}

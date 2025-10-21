import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize OpenAI client lazily to avoid build-time errors when env var is missing
function getOpenAIClient() {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error(
      "OPENROUTER_API_KEY is not configured. Please add it to your .env.local file. See .env.example for reference."
    )
  }

  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
      "HTTP-Referer": "https://pixelforge.ai",
      "X-Title": "PixelForge AI Image Editor",
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const openai = getOpenAIClient()
    const { prompt, imageBase64 } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    console.log("Generating image with prompt:", prompt)
    console.log("Has input image:", !!imageBase64)

    // Prepare the content array
    const content: any[] = [
      {
        type: "text",
        text: prompt,
      },
    ]

    // Add image if provided
    if (imageBase64) {
      content.push({
        type: "image_url",
        image_url: {
          url: imageBase64,
        },
      })
    }

    // Call Gemini 2.5 Flash Image API with modalities
    console.log("Calling OpenRouter API for image generation...")
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-image-preview",
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
      modalities: ["image", "text"] as any, // Required for image generation
      max_tokens: 4096,
      temperature: 0.7,
    })

    console.log("API Response received")
    console.log("Choices:", completion.choices?.length)

    const choice = completion.choices[0]
    if (!choice) {
      console.error("No choices in response")
      return NextResponse.json({ error: "No response from API" }, { status: 500 })
    }

    console.log("Message:", choice.message)

    // Check for images in the response
    const message = choice.message as any

    // Images are returned in the images field as base64 data URLs
    if (message.images && message.images.length > 0) {
      const imageData = message.images[0]
      console.log("Generated image found")
      console.log("Image data structure:", JSON.stringify(imageData))

      // Extract the actual URL from the image_url object
      let imageUrl = imageData
      if (imageData.image_url) {
        imageUrl = imageData.image_url.url || imageData.image_url
      }

      console.log("Final image URL type:", typeof imageUrl)

      return NextResponse.json({
        success: true,
        imageUrl: imageUrl,
        textResponse: message.content,
      })
    }

    // If no image but has content, try to extract image URL from content
    if (message.content) {
      console.log("Response content:", message.content)

      // Check if content contains a URL or markdown image
      const imageUrlMatch = message.content.match(/!\[.*?\]\((.*?)\)/)
      if (imageUrlMatch) {
        return NextResponse.json({
          success: true,
          imageUrl: imageUrlMatch[1],
          textResponse: message.content,
        })
      }

      // Check for direct URL
      const urlMatch = message.content.match(/(https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp))/i)
      if (urlMatch) {
        return NextResponse.json({
          success: true,
          imageUrl: urlMatch[0],
          textResponse: message.content,
        })
      }

      // No image found in response
      return NextResponse.json(
        {
          error: "Model did not generate an image",
          textResponse: message.content,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: "No image or content in response",
        details: JSON.stringify(message),
      },
      { status: 500 }
    )
  } catch (error: any) {
    console.error("Error generating image:", error)
    console.error("Error message:", error.message)
    console.error("Error response:", error.response?.data)

    return NextResponse.json(
      {
        error: error.message || "An error occurred while generating the image",
        details: error.response?.data ? JSON.stringify(error.response.data) : error.toString(),
      },
      { status: 500 }
    )
  }
}

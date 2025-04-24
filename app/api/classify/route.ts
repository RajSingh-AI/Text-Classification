import { NextResponse } from "next/server"

// In a real application, this would connect to a Python backend
// that runs the TensorFlow model for classification
export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // This is a mock implementation
    // In a real app, you would call your TensorFlow model here
    const positiveWords = ["good", "great", "excellent", "amazing", "love", "happy", "best", "wonderful"]
    const negativeWords = ["bad", "terrible", "awful", "hate", "worst", "poor", "disappointing", "horrible"]

    const lowerText = text.toLowerCase()
    let positiveScore = 0
    let negativeScore = 0

    positiveWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "g")
      const matches = lowerText.match(regex)
      if (matches) positiveScore += matches.length
    })

    negativeWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "g")
      const matches = lowerText.match(regex)
      if (matches) negativeScore += matches.length
    })

    // Default slightly positive if no sentiment words found
    if (positiveScore === 0 && negativeScore === 0) {
      return NextResponse.json({
        sentiment: "positive",
        confidence: 0.55,
      })
    }

    const total = positiveScore + negativeScore
    const positiveRatio = positiveScore / total

    return NextResponse.json({
      sentiment: positiveRatio > 0.5 ? "positive" : "negative",
      confidence: Math.max(0.5, Math.min(0.99, positiveRatio > 0.5 ? positiveRatio : 1 - positiveRatio)),
    })
  } catch (error) {
    console.error("Classification error:", error)
    return NextResponse.json({ error: "Failed to classify text" }, { status: 500 })
  }
}


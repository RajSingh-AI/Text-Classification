"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react"

// Simulated classification function (in a real app, this would call an API)
const classifyText = (text: string): Promise<{ sentiment: "positive" | "negative"; confidence: number }> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // Simple heuristic for demo purposes
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
        resolve({ sentiment: "positive", confidence: 0.55 })
        return
      }

      const total = positiveScore + negativeScore
      const positiveRatio = positiveScore / total

      resolve({
        sentiment: positiveRatio > 0.5 ? "positive" : "negative",
        confidence: Math.max(0.5, Math.min(0.99, positiveRatio > 0.5 ? positiveRatio : 1 - positiveRatio)),
      })
    }, 1000)
  })
}

export function TextClassifier() {
  const [text, setText] = useState("")
  const [result, setResult] = useState<{ sentiment: "positive" | "negative"; confidence: number } | null>(null)
  const [isClassifying, setIsClassifying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClassify = async () => {
    if (!text.trim()) {
      setError("Please enter some text to classify")
      return
    }

    setError(null)
    setIsClassifying(true)

    try {
      const classification = await classifyText(text)
      setResult(classification)
    } catch (err) {
      setError("An error occurred during classification")
      console.error(err)
    } finally {
      setIsClassifying(false)
    }
  }

  const handleReset = () => {
    setText("")
    setResult(null)
    setError(null)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Text Classification</CardTitle>
        <CardDescription>Enter text to analyze its sentiment</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Enter text to classify (e.g., 'This movie was amazing, I really enjoyed it!')"
          className="min-h-[150px] mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {error && <p className="text-destructive text-sm mt-2">{error}</p>}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Sentiment:</h3>
                <Badge
                  variant={result.sentiment === "positive" ? "default" : "destructive"}
                  className="flex items-center gap-1"
                >
                  {result.sentiment === "positive" ? (
                    <>
                      <ThumbsUp className="h-3 w-3" /> Positive
                    </>
                  ) : (
                    <>
                      <ThumbsDown className="h-3 w-3" /> Negative
                    </>
                  )}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Confidence: {Math.round(result.confidence * 100)}%
                </span>
              </div>
            </div>

            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${result.sentiment === "positive" ? "bg-green-500" : "bg-red-500"}`}
                style={{ width: `${result.confidence * 100}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset} disabled={isClassifying || (!text && !result)}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button onClick={handleClassify} disabled={isClassifying || !text.trim()}>
          {isClassifying ? "Classifying..." : "Classify Text"}
        </Button>
      </CardFooter>
    </Card>
  )
}


"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"

const examples = [
  {
    text: "This movie was absolutely amazing! The acting was superb and the plot kept me engaged throughout.",
    sentiment: "positive",
    confidence: 0.95,
  },
  {
    text: "I can't believe how terrible this restaurant was. The food was cold and the service was awful.",
    sentiment: "negative",
    confidence: 0.92,
  },
  {
    text: "The product works as expected. It's not exceptional but gets the job done.",
    sentiment: "positive",
    confidence: 0.68,
  },
  {
    text: "While there were some good moments, overall I was disappointed with the experience.",
    sentiment: "negative",
    confidence: 0.75,
  },
]

export function ExamplesSection() {
  const [selectedExample, setSelectedExample] = useState<number | null>(null)

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Example Classifications</CardTitle>
        <CardDescription>See how the model classifies different text examples</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {examples.map((example, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setSelectedExample(selectedExample === index ? null : index)}
            >
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm">{example.text}</p>
                <Button
                  size="sm"
                  variant={example.sentiment === "positive" ? "default" : "destructive"}
                  className="ml-4 shrink-0"
                >
                  {example.sentiment === "positive" ? (
                    <>
                      <ThumbsUp className="h-4 w-4 mr-1" /> Positive
                    </>
                  ) : (
                    <>
                      <ThumbsDown className="h-4 w-4 mr-1" /> Negative
                    </>
                  )}
                </Button>
              </div>

              {selectedExample === index && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>0%</span>
                    <span>Confidence: {Math.round(example.confidence * 100)}%</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${example.sentiment === "positive" ? "bg-green-500" : "bg-red-500"}`}
                      style={{ width: `${example.confidence * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


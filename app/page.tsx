import { TextClassifier } from "@/components/text-classifier"
import { ModelInfo } from "@/components/model-info"
import { ExamplesSection } from "@/components/examples-section"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4 max-w-5xl">
      <h1 className="text-4xl font-bold text-center mb-2">Text Sentiment Classifier</h1>
      <p className="text-center text-muted-foreground mb-8">
        Analyze the sentiment of text using a TensorFlow model trained on IMDB reviews
      </p>

      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <TextClassifier />
        <ModelInfo />
      </div>

      <ExamplesSection />
    </main>
  )
}


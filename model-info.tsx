import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function ModelInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Information</CardTitle>
        <CardDescription>Details about the TensorFlow model</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-1">Dataset</h3>
          <p className="text-sm text-muted-foreground">IMDB Reviews</p>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-1">Architecture</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Word Embedding (Google GNews Swivel)</li>
            <li>• Dense Layer (16 neurons, ReLU)</li>
            <li>• Output Layer (1 neuron, Sigmoid)</li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-1">Training</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Optimizer: Adam</li>
            <li>• Loss: Binary Crossentropy</li>
            <li>• Epochs: 25</li>
          </ul>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-1">Example Inputs</h3>
          <div className="space-y-2 mt-2">
            <div className="text-sm p-2 bg-muted rounded-md">
              "This movie was fantastic! I loved the plot and the acting was superb."
            </div>
            <div className="text-sm p-2 bg-muted rounded-md">
              "I was disappointed with this product. It broke after just a few uses."
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


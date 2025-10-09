import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Maximize2, Sparkles, ImageIcon, Scissors, Wand2, Expand } from "lucide-react"

const tools = [
  {
    title: "Universal Resizer",
    description: "Resize any images for any social media",
    icon: Maximize2,
    badge: "Popular",
    image: "/person-covering-eyes-playful.jpg",
  },
  {
    title: "Mike AI",
    description: "Text generation for millions of use cases, free for 7 days",
    icon: Sparkles,
    badge: "New",
    image: "/laptop-workspace-desk.jpg",
  },
  {
    title: "Replace background",
    description: "Teleport anything, anywhere with AI",
    icon: ImageIcon,
    badge: "Beta feature",
    image: "/wine-bottle-product.jpg",
  },
  {
    title: "Remove background",
    description: "Extract the main subject from a picture with incredible accuracy. It's like magic.",
    icon: Scissors,
    image: "/person-sunglasses-curly-hair.jpg",
  },
  {
    title: "Cleanup",
    description: "Remove objects, people, text and defects from your pictures automatically",
    icon: Wand2,
    image: "/hand-holding-highlighter-paper.jpg",
  },
  {
    title: "Uncrop",
    description: "Uncrop your photos to any image format",
    icon: Expand,
    image: "/group-people-celebration.jpg",
  },
  {
    title: "Image upscaler",
    description: "Upscale your images by 2x or 4x in seconds. It can even restore blurry and become beautiful.",
    icon: ImageIcon,
    image: "/mountain-peak-snow-sky.jpg",
  },
]

const categories = [
  { label: "Popular", active: true },
  { label: "New", active: false },
  { label: "Image edition", active: false },
  { label: "Generative tools", active: false },
  { label: "Real-estate", active: false },
  { label: "Portrait edition", active: false },
  { label: "API", active: false },
]

export function ToolsSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">TOOLS</h2>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <Badge
            key={category.label}
            variant={category.active ? "default" : "outline"}
            className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {category.label}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tools.map((tool) => (
          <Card key={tool.title} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="relative h-48 overflow-hidden bg-muted">
              <img
                src={tool.image || "/placeholder.svg"}
                alt={tool.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {tool.badge && <Badge className="absolute top-3 right-3">{tool.badge}</Badge>}
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <tool.icon className="h-5 w-5" />
                {tool.title}
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Badge variant="secondary" className="px-4 py-2">
          New
        </Badge>
      </div>
    </section>
  )
}

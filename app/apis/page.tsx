import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function APIsPage() {
  const apis = [
    {
      title: "Uncrop",
      description:
        "Uncrop your pictures to any format, extend bodies, objects or scenarios to enlarge your pictures and adapt them to any format with the right amount of context.",
      image: "/api-uncrop.jpg",
      link: "#",
    },
    {
      title: "Remove Background",
      description:
        "With the PixelForge background removal API, you can quickly remove the background of any image with extreme precision. Our API is trained on billions of extra world's the most accurate background removal solution available on the market.",
      image: "/api-remove-bg.jpg",
      link: "#",
    },
    {
      title: "Image upscaling",
      description:
        "Sometimes the only thing preventing you from improving a memorable picture is its low resolution. With our image upscaling API, transform your low resolution image into an ultra sharp high resolution image. Upscale your images by 2x or 4x while keeping the upscale your up to 4X.",
      image: "/api-upscale.jpg",
      link: "#",
    },
    {
      title: "Cleanup",
      description:
        "For many photos contain unwanted objects, text, or persons. Now, you can simply remove all these flaws with Cleanup API. Based on artificial intelligence, the API enables you to clean and retouch your pictures by removing unwanted snappers in the background or blemishes on portraits.",
      image: "/api-cleanup.jpg",
      link: "#",
    },
    {
      title: "Remove Text",
      description:
        "Our cutting-edge Text Removal API lets you effortlessly erase text from images! Say goodbye to the tedious task of manually editing images, and enjoy the convenience and efficiency of our state-of-the-art technology.",
      image: "/api-remove-text.jpg",
      link: "#",
    },
    {
      title: "Product photography",
      description:
        "Create realistic studio-like pictures for your objects with the product photography API with a simple API call. Choose your favorite background color and generate standardized product images that will make your products shine.",
      image: "/api-product.jpg",
      link: "#",
    },
    {
      title: "Text to Image",
      description:
        "Thanks to tools like DALL-E and Midjourney, text-to-image generation has become accessible to many mainstream use-cases. Our implementation can run on of Stable Diffusion has been heavily optimized for extreme speed and provides the fastest API for generating high-quality images from text.",
      image: "/api-text-to-image.jpg",
      link: "#",
    },
    {
      title: "Replace Background",
      description:
        "We've combined our best-in-class Stable Diffusion inpainting model with our state-of-the-art internal models (such as background removal) to provide the best background replacement API. Send an image with a prompt to teleport your ideas anywhere with high fidelity.",
      image: "/api-replace-bg.jpg",
      link: "#",
      badge: "BETA",
    },
    {
      title: "Upcoming APIs",
      description: "Stay tuned for new upcoming APIs or contact us to tell us about your needs!",
      image: "/api-upcoming.jpg",
      link: "#",
      isUpcoming: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">PixelForge APIs</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Integrate state of the art image processing AI directly in your products.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Contact us to get started
          </Button>
        </div>
      </section>

      {/* APIs Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apis.map((api, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img src={api.image || "/placeholder.svg"} alt={api.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-semibold text-primary">{api.title}</h3>
                    {api.badge && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {api.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{api.description}</p>
                  <Link href={api.link} className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                    {api.isUpcoming ? "Contact us" : "Documentation and code samples"}
                    <span>→</span>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">PixelForge APIs</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline opacity-90">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline opacity-90">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline opacity-90">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline opacity-90">
                    Terms of use
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Social</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline opacity-90">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline opacity-90">
                    Product Hunt
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline opacity-90">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline opacity-90">
                    Github
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm opacity-90">
            Copyright © 2025 Initials - PixelForge
          </div>
        </div>
      </footer>
    </div>
  )
}

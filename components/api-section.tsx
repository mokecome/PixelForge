import type React from "react"
import { Button } from "@/components/ui/button"

export function ApiSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-8">
        <Badge className="mb-4">API</Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          ADD MAGIC TO YOUR OWN APPS
          <br />
          WITH THE <span className="text-primary">PIXELFORGE API</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          The PixelForge API allows you to integrate best-in-class AI to your apps in minutes.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button size="lg" className="font-semibold">
            Get started with the PixelForge API
          </Button>
          <Button size="lg" variant="outline" className="font-semibold bg-transparent">
            Open source Demos
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <img src="/mobile-phone-app-interface.jpg" alt="Mobile app" className="w-full h-auto" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <img src="/web-dashboard-interface.jpg" alt="Web interface" className="w-full h-auto" />
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <img src="/api-documentation-code.png" alt="API docs" className="w-full h-auto" />
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4">
                <img src="/movie-poster-back-to-future.jpg" alt="Example output" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground ${className}`}
    >
      {children}
    </span>
  )
}

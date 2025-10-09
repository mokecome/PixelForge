import { Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
          CREATE STUNNING VISUALS
          <br />
          IN SECONDS
        </h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl">
          <div className="absolute inset-0 bg-[url('/checkered-transparency-pattern.jpg')] opacity-30" />

          <div className="relative p-8 md:p-12">
            <div className="text-white mb-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">remove</h2>
              <h2 className="text-3xl md:text-5xl font-bold">background</h2>
            </div>

            <div className="grid grid-cols-3 gap-6 items-end">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 aspect-square flex items-center justify-center">
                <img src="/modern-chair.png" alt="Chair" className="w-full h-full object-contain" />
              </div>

              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 aspect-square flex items-center justify-center">
                  <img src="/person-standing-fashion.jpg" alt="Person" className="w-full h-full object-contain" />
                </div>
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
                    <Play className="h-6 w-6 text-primary fill-primary" />
                  </div>
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 aspect-square flex items-center justify-center">
                <img src="/brown-bomber-jacket.jpg" alt="Jacket" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

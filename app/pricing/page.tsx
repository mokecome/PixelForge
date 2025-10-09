import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">Pricing</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-32">
          {/* Free Plan */}
          <div className="bg-neutral-100 rounded-3xl p-8 flex flex-col">
            <div className="mb-6">
              <div className="inline-block bg-neutral-200 text-neutral-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
                Free
              </div>
              <div className="mb-6">
                <span className="text-sm text-neutral-600">$</span>
                <span className="text-7xl font-bold">0</span>
              </div>
            </div>

            <ul className="space-y-2 text-sm mb-8 flex-grow">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Unlimited images</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Resolution limited to 720p</span>
              </li>
            </ul>

            <Button className="w-full bg-black hover:bg-neutral-800 text-white rounded-full">Try it free</Button>
          </div>

          {/* Pro Plan - Featured */}
          <div className="bg-lime-50 rounded-3xl p-8 flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-lime-400 text-black text-xs font-bold px-4 py-1 rounded-full">BEST</div>
            </div>

            <div className="mb-6">
              <div className="inline-block bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
                Cleanup Pro
              </div>
              <div className="mb-1">
                <span className="text-sm text-neutral-600">$</span>
                <span className="text-7xl font-bold">3</span>
              </div>
              <p className="text-sm text-neutral-600">starting from</p>
            </div>

            <ul className="space-y-2 text-sm mb-8 flex-grow">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Unlimited images</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Unlimited resolution</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>High quality refiner</span>
              </li>
            </ul>

            <Button className="w-full bg-black hover:bg-neutral-800 text-white rounded-full">Try it free</Button>
          </div>

          {/* API Plan */}
          <div className="bg-neutral-100 rounded-3xl p-8 flex flex-col">
            <div className="mb-6">
              <div className="inline-block bg-neutral-200 text-neutral-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
                API
              </div>
              <div className="mb-1">
                <span className="text-sm text-neutral-600">$</span>
                <span className="text-7xl font-bold">11</span>
              </div>
              <p className="text-sm text-neutral-600 mb-6">starting from</p>
            </div>

            <ul className="space-y-2 text-sm mb-6 flex-grow">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Cleanup</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Remove background</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Replace background</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Uncrop</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>And more AI</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Workflows</span>
              </li>
            </ul>

            <div className="space-y-2 mb-6">
              <a href="#" className="text-sm underline block">
                Usage-based pricing
              </a>
              <a href="/apis" className="text-sm underline block">
                API documentation
              </a>
            </div>

            <Button className="w-full bg-black hover:bg-neutral-800 text-white rounded-full">Try it free</Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold mb-4">r/o</h2>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">What is Inpainting?</h3>
              <p className="text-neutral-600 leading-relaxed">
                Inpainting is a retouching technology used to remove any unwanted objects from photos (object removal).
                It can be used to remove an unwanted person. It used to work with a Clone tool like the square, but
                using artificial intelligence gives much better results today.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">Why PixelForge is better than other inpainting app?</h3>
              <p className="text-neutral-600 leading-relaxed">
                PixelForge is an advanced editing tool based on Artificial Intelligence that is much faster, much more
                accurate and much easier to use than any other inpainting app. You don't need to be precise while our AI
                is truly able to guess what was behind the unwanted text, the unwanted people, unnecessary objects in
                just a few clicks.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">What image resolutions can PixelForge handle?</h3>
              <p className="text-neutral-600 leading-relaxed">
                You can import and edit pictures of any size in PixelForge desktop. Export will be limited to 720px for
                the free version. Then <span className="bg-lime-200">go pro here</span>, but the Pro version, we're
                continuously improving the quality of the image exported by PixelForge.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">How much PixelForge cost?</h3>
              <p className="text-neutral-600 leading-relaxed">
                PixelForge is <span className="bg-lime-200">free to use</span>. You can export images in{" "}
                <span className="bg-lime-200">HD quality</span> with a <span className="bg-lime-200">$3/month</span>{" "}
                subscription. The paid allows testing the HD quality for free.
              </p>
              <p className="text-neutral-600 leading-relaxed mt-4">
                This trial period is a way to let you fully evaluate it before you make the decision to purchase the
                full version.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">What is your refund policy?</h3>
              <p className="text-neutral-600 leading-relaxed">
                We provide a free trial period of our offering to let you fully evaluate it before you make the decision
                to purchase the full version.
              </p>
              <p className="text-neutral-600 leading-relaxed mt-4">
                Our support team is standing by to answer all your questions if need be. Please see the product's
                features and functionalities, and coordinate with our support team to clarify your doubts before you
                make the purchase.
              </p>
              <p className="text-neutral-600 leading-relaxed mt-4">
                The trial period free we offer should be considered a "free look period." During this time, we encourage
                you to use our solution, test it, and decide if you would like to purchase the full version. Once you
                make the purchase, you are committing to the product. Refunds will be given in the rarest of cases once
                the subscription has been activated. Once the license is activated, refunds will be given in the rarest
                cases due to technical difficulties, platform incompatibilities or other unforeseen circumstances.
                Refunds are at the discretion of days since the subscription started.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">How to use Edit, Pause or Cancel my subscription?</h3>
              <p className="text-neutral-600 leading-relaxed mb-4">
                You can manage your subscription by visiting the "manage subscription" section.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">How many users can use a PixelForge subscription?</h3>
              <p className="text-neutral-600 leading-relaxed">
                Each PixelForge subscription is individual and limited to 1 user.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">How can I use the Inpainting API?</h3>
              <p className="text-neutral-600 leading-relaxed">
                PixelForge's API can be used in any environment such as Node.js, Python, Kotlin, etc. We provide
                extensive documentation, a few demos and numerous samples to get started quickly.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-200 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-neutral-500">Copyright 2025 © PixelForge</div>
        </div>
      </footer>
    </div>
  )
}

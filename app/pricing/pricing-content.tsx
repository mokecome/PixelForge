"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type BillingPeriod = "monthly" | "yearly"

const PLANS = {
  basic: {
    name: "Basic",
    monthly: 12,
    yearly: 144,
    credits: 1800,
    imagesPerMonth: 75,
    features: [
      "75 high-quality images/month",
      "1800 credits/year",
      "Basic features",
      "Community support",
      "Commercial license"
    ]
  },
  pro: {
    name: "Pro",
    monthly: 19.5,
    yearly: 234,
    credits: 9600,
    imagesPerMonth: 400,
    popular: true,
    features: [
      "400 high-quality images/month",
      "9600 credits/year",
      "All basic features",
      "Priority processing",
      "Advanced AI tools",
      "Priority support",
      "Commercial license"
    ]
  },
  max: {
    name: "Max",
    monthly: 80,
    yearly: 960,
    credits: 19200,
    imagesPerMonth: 800,
    features: [
      "800 high-quality images/month",
      "19200 credits/year",
      "All pro features",
      "Unlimited resolution",
      "API access",
      "Dedicated support",
      "Enterprise license"
    ]
  }
}

export function PricingContent() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("yearly")

  const handleSubscribe = async (planName: string) => {
    const plan = PLANS[planName.toLowerCase() as keyof typeof PLANS]
    const price = billingPeriod === "monthly" ? plan.monthly : plan.yearly

    try {
      const response = await fetch("/api/creem/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          planName: plan.name,
          price,
          billingPeriod
        })
      })

      const data = await response.json()

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (error) {
      console.error("Error creating checkout:", error)
    }
  }

  return (
    <main className="container mx-auto px-4 py-20">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Choose the perfect plan for your creative needs. All plans include commercial license.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <button
          onClick={() => setBillingPeriod("monthly")}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            billingPeriod === "monthly"
              ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg"
              : "bg-white text-neutral-600 hover:bg-neutral-50"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingPeriod("yearly")}
          className={`px-6 py-2 rounded-full font-medium transition-all relative ${
            billingPeriod === "yearly"
              ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg"
              : "bg-white text-neutral-600 hover:bg-neutral-50"
          }`}
        >
          Yearly
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
            Save 50%
          </span>
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
        {/* Basic Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 flex flex-col shadow-lg hover:shadow-xl transition-shadow border border-neutral-200 dark:border-gray-700">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">{PLANS.basic.name}</h3>
            <div className="mb-4">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">$</span>
              <span className="text-5xl font-bold">
                {billingPeriod === "monthly" ? PLANS.basic.monthly : Math.round(PLANS.basic.yearly / 12)}
              </span>
              <span className="text-neutral-600 dark:text-neutral-400">/month</span>
            </div>
            {billingPeriod === "yearly" && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Billed ${PLANS.basic.yearly} yearly
              </p>
            )}
          </div>

          <ul className="space-y-3 mb-8 flex-grow">
            {PLANS.basic.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() => handleSubscribe("basic")}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white rounded-full py-6 font-semibold shadow-lg"
          >
            Get Started
          </Button>
        </div>

        {/* Pro Plan - Featured */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-3xl p-8 flex flex-col relative shadow-2xl border-2 border-yellow-400 dark:border-yellow-600 scale-105">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-6 py-2 rounded-full shadow-lg">
              MOST POPULAR
            </div>
          </div>

          <div className="mb-6 mt-2">
            <h3 className="text-2xl font-bold mb-4">{PLANS.pro.name}</h3>
            <div className="mb-4">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">$</span>
              <span className="text-5xl font-bold">
                {billingPeriod === "monthly" ? PLANS.pro.monthly : Math.round(PLANS.pro.yearly / 12)}
              </span>
              <span className="text-neutral-600 dark:text-neutral-400">/month</span>
            </div>
            {billingPeriod === "yearly" && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Billed ${PLANS.pro.yearly} yearly
              </p>
            )}
          </div>

          <ul className="space-y-3 mb-8 flex-grow">
            {PLANS.pro.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() => handleSubscribe("pro")}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-full py-6 font-semibold shadow-xl"
          >
            Get Started
          </Button>
        </div>

        {/* Max Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 flex flex-col shadow-lg hover:shadow-xl transition-shadow border border-neutral-200 dark:border-gray-700">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">{PLANS.max.name}</h3>
            <div className="mb-4">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">$</span>
              <span className="text-5xl font-bold">
                {billingPeriod === "monthly" ? PLANS.max.monthly : Math.round(PLANS.max.yearly / 12)}
              </span>
              <span className="text-neutral-600 dark:text-neutral-400">/month</span>
            </div>
            {billingPeriod === "yearly" && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Billed ${PLANS.max.yearly} yearly
              </p>
            )}
          </div>

          <ul className="space-y-3 mb-8 flex-grow">
            {PLANS.max.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className="text-sm text-neutral-700 dark:text-neutral-300">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={() => handleSubscribe("max")}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white rounded-full py-6 font-semibold shadow-lg"
          >
            Get Started
          </Button>
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

      <footer className="border-t border-neutral-200 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-neutral-500">Copyright 2025 © PixelForge</div>
        </div>
      </footer>
    </main>
  )
}

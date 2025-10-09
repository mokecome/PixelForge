"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const faqs = [
  {
    question: "How to remove the background of a picture for free?",
    answer: "Upload your image to PixelForge and our AI will automatically remove the background in seconds.",
  },
  {
    question: "How to remove an object from a picture?",
    answer: "Use our Cleanup tool to select and remove any unwanted objects from your images.",
  },
  {
    question: "How to remove a person from a picture?",
    answer:
      "Our AI-powered Cleanup tool can intelligently remove people from photos while maintaining natural backgrounds.",
  },
  {
    question: "How to remove background in photoshop?",
    answer:
      "While Photoshop is great, PixelForge offers a faster, AI-powered alternative that requires no manual selection.",
  },
]

export function FaqSection() {
  const [showAll, setShowAll] = useState(false)
  const displayedFaqs = showAll ? faqs : faqs.slice(0, 3)

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">FREQUENTLY ASKED QUESTIONS</h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {displayedFaqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
              <span className="font-medium text-lg">{faq.question}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-open:rotate-90 transition-transform" />
            </summary>
            <div className="px-6 pb-6 text-muted-foreground">{faq.answer}</div>
          </details>
        ))}

        {!showAll && (
          <div className="text-center pt-4">
            <Button variant="outline" onClick={() => setShowAll(true)} className="gap-2">
              Show more
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

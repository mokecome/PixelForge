import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ToolsSection } from "@/components/tools-section"
import { ApiSection } from "@/components/api-section"
import { FaqSection } from "@/components/faq-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ToolsSection />
        <ApiSection />
        <FaqSection />
      </main>
    </div>
  )
}

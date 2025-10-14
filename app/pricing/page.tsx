import { Header } from "@/components/header"
import { PricingContent } from "./pricing-content"

// Use Node.js runtime for Supabase compatibility
export const runtime = 'nodejs'

export default async function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-amber-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <PricingContent />
    </div>
  )
}

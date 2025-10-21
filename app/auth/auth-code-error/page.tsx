import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-2">Authentication Error</h1>
              <p className="text-muted-foreground">
                We encountered an error while signing you in. This could be due to:
              </p>
            </div>

            <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>The authentication code was invalid or expired</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>The authentication request was cancelled</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>A technical issue occurred during the process</span>
              </li>
            </ul>

            <div className="space-y-3">
              <Link href="/login" className="block">
                <Button className="w-full" size="lg">
                  Try Again
                </Button>
              </Link>
              <Link href="/" className="block">
                <Button variant="outline" className="w-full" size="lg">
                  Return Home
                </Button>
              </Link>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                If this problem persists, please{" "}
                <a href="#" className="text-primary hover:underline">
                  contact support
                </a>
                .
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github } from "lucide-react"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { provider?: string }
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is already logged in, redirect to home
  if (user) {
    redirect("/")
  }

  // Handle direct provider login from dropdown
  const provider = searchParams.provider
  if (provider === "github" || provider === "google") {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider as "github" | "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/auth/callback`,
        queryParams:
          provider === "google"
            ? {
                access_type: "offline",
                prompt: "consent",
              }
            : undefined,
      },
    })

    if (data.url) {
      redirect(data.url)
    }
  }

  const signInWithGitHub = async () => {
    "use server"
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/auth/callback`,
      },
    })

    if (data.url) {
      redirect(data.url)
    }
  }

  const signInWithGoogle = async () => {
    "use server"
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })

    if (data.url) {
      redirect(data.url)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome to PixelForge</h1>
              <p className="text-muted-foreground">Sign in to start creating amazing visuals</p>
            </div>

            <div className="space-y-3">
              <form action={signInWithGitHub}>
                <Button type="submit" className="w-full h-12 text-base" size="lg" variant="outline">
                  <Github className="w-5 h-5 mr-2" />
                  Sign in with GitHub
                </Button>
              </form>

              <form action={signInWithGoogle}>
                <Button type="submit" className="w-full h-12 text-base" size="lg" variant="outline">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </Button>
              </form>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">More sign-in options coming soon</p>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>By signing in, you agree to our</p>
              <div className="flex gap-2 justify-center mt-1">
                <a href="#" className="underline hover:text-foreground">
                  Terms of Service
                </a>
                <span>and</span>
                <a href="#" className="underline hover:text-foreground">
                  Privacy Policy
                </a>
              </div>
            </div>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>New to PixelForge?</p>
            <p className="mt-1">
              Signing in with GitHub will automatically create an account for you.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

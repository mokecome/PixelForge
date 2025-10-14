import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/server"
import {
  ChevronDown,
  Sparkles,
  Eraser,
  ArrowUpCircle,
  ImageOff,
  ImagePlus,
  Type,
  LogOut,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SignInDropdown } from "@/components/sign-in-dropdown"

export async function Header() {
  let user = null

  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch (error) {
    console.error("Failed to get user:", error)
    // Continue rendering without user data
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="h-5 w-5 rounded bg-primary" />
              <span className="text-lg font-semibold">PixelForge by Mike</span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors">
                  Tools
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>All tools</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eraser className="mr-2 h-4 w-4" />
                  <span>Cleanup</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowUpCircle className="mr-2 h-4 w-4" />
                  <span>Image upscaler</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ImageOff className="mr-2 h-4 w-4" />
                  <span>Remove background</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ImagePlus className="mr-2 h-4 w-4" />
                  <span>Replace background</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/image-edit" className="flex items-center">
                    <Type className="mr-2 h-4 w-4" />
                    <span>Image Edit</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="/apis" className="text-sm text-foreground hover:text-primary transition-colors">
              API
            </a>
            <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">
              Mike Free Trial
            </a>
            <a href="/pricing" className="text-sm text-foreground hover:text-primary transition-colors">
              Pricing
            </a>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.user_metadata?.full_name && (
                        <p className="font-medium">{user.user_metadata.full_name}</p>
                      )}
                      {user.email && <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form action="/api/auth/logout" method="POST" className="w-full">
                      <button type="submit" className="flex w-full items-center cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <SignInDropdown />
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ChevronDown,
  Sparkles,
  Eraser,
  ArrowUpCircle,
  Lightbulb,
  ImageOff,
  ImagePlus,
  Type,
  RemoveFormatting,
  Crop,
  Maximize2,
  FileText,
} from "lucide-react"

export function Header() {
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
            <Button variant="outline" size="sm">
              Sign in / Sign up
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

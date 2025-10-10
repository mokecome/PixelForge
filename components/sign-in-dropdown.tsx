"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

export function SignInDropdown() {
  const [email, setEmail] = useState("")
  const [open, setOpen] = useState(false)

  const handleGitHubSignIn = async () => {
    window.location.href = "/login?provider=github"
  }

  const handleGoogleSignIn = async () => {
    window.location.href = "/login?provider=google"
  }

  const handleEmailContinue = async () => {
    // Handle email sign-in logic here
    console.log("Email:", email)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full border-2 hover:shadow-md transition-all duration-300"
        >
          Sign-in / Sign-up
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[440px] p-0 rounded-3xl border-0 shadow-2xl bg-white relative"
        align="end"
        sideOffset={8}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        <div className="px-8 pt-8 pb-6">
          <h2 className="text-[20px] font-bold text-[#404040] text-left leading-[20px]">
            Sign in to continue
          </h2>
        </div>

        <div className="px-8 pb-8 space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-[12px] font-bold text-[#1c60f6] leading-[12px]"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl border-2 border-gray-200 bg-gray-50 px-4 text-[14px] font-normal leading-[14px] focus:border-blue-400 focus:bg-white transition-all duration-200 placeholder:text-gray-400"
            />
          </div>

          <Button
            onClick={handleEmailContinue}
            className="w-full h-12 bg-blue-200 hover:bg-blue-300 text-[#2d2d2d] text-[16px] font-normal rounded-full transition-all duration-300"
          >
            Continue
          </Button>

          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-[14px]">
              <span className="bg-white px-4 text-gray-600 font-normal">or</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleGoogleSignIn}
              className="w-full h-12 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-[16px] font-normal rounded-full transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="white">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </Button>

            <Button
              onClick={handleGitHubSignIn}
              className="w-full h-12 bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-[16px] font-normal rounded-full transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="white">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </Button>
          </div>

          <div className="text-center text-[12px] leading-[18px] text-gray-600 pt-2">
            By signing up, you agree to the{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline transition-colors">
              Privacy Policy
            </a>
            , including{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline transition-colors">
              Cookie Use
            </a>
            .
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

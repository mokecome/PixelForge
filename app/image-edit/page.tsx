"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Sparkles, Wand2, Image as ImageIcon, Download, Share2 } from "lucide-react"
import { toast } from "sonner"

export default function ImageEditPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationHistory, setGenerationHistory] = useState<string[]>([])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (50MB limit)
      if (file.size > 50 * 1024 * 1024) {
        toast.error("File size exceeds 50MB limit")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
        toast.success("Image uploaded successfully")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt")
      return
    }

    setIsGenerating(true)
    setGeneratedImage(null)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          imageBase64: uploadedImage,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("API Error:", data)
        const errorMsg = data.details ? `${data.error}: ${JSON.stringify(data.details)}` : data.error
        throw new Error(errorMsg || "Failed to generate image")
      }

      if (data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl)
        setGenerationHistory((prev) => [data.imageUrl, ...prev.slice(0, 5)])
        toast.success("Image generated successfully!")
      } else {
        throw new Error("No image URL returned")
      }
    } catch (error: any) {
      console.error("Generation error:", error)
      toast.error(error.message || "Failed to generate image")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!generatedImage) return

    const link = document.createElement("a")
    link.href = generatedImage
    link.download = `pixelforge-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success("Image downloaded!")
  }

  const handleShare = async () => {
    if (!generatedImage) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: "PixelForge AI Generated Image",
          text: "Check out this image I created with PixelForge!",
          url: window.location.href,
        })
        toast.success("Shared successfully!")
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">AI Image Editor</h1>
          <p className="text-muted-foreground">
            Transform your images with AI-powered editing using natural language prompts
          </p>
        </div>

        {/* Main Editor Layout */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            <Card className="p-6">
              <Tabs defaultValue="image-edit" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="text-to-image">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Text to Image
                  </TabsTrigger>
                  <TabsTrigger value="image-to-image">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Image to Image
                  </TabsTrigger>
                  <TabsTrigger value="image-edit">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Image Edit
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="text-to-image" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="text-prompt">Describe what you want to create</Label>
                    <Textarea
                      id="text-prompt"
                      placeholder="A futuristic city at sunset with flying cars..."
                      className="min-h-[100px] mt-2"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="image-to-image" className="space-y-4 mt-4">
                  <div>
                    <Label>Upload Reference Image</Label>
                    <div className="mt-2">
                      <label
                        htmlFor="image-upload-ref"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors"
                      >
                        {uploadedImage ? (
                          <img
                            src={uploadedImage}
                            alt="Uploaded"
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">PNG, JPG up to 50MB</p>
                          </div>
                        )}
                        <input
                          id="image-upload-ref"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="ref-prompt">Transformation prompt</Label>
                    <Textarea
                      id="ref-prompt"
                      placeholder="Make it look like a watercolor painting..."
                      className="min-h-[80px] mt-2"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="image-edit" className="space-y-4 mt-4">
                  <div>
                    <Label>Add Image (Optional)</Label>
                    <div className="mt-2">
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors"
                      >
                        {uploadedImage ? (
                          <div className="relative w-full h-full p-4">
                            <img
                              src={uploadedImage}
                              alt="Uploaded"
                              className="w-full h-full object-contain rounded"
                            />
                            <Button
                              size="sm"
                              variant="destructive"
                              className="absolute top-2 right-2"
                              onClick={(e) => {
                                e.preventDefault()
                                setUploadedImage(null)
                                toast.info("Image removed")
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 50MB</p>
                          </div>
                        )}
                        <input
                          id="image-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="edit-prompt">Main Prompt *</Label>
                    <Textarea
                      id="edit-prompt"
                      placeholder="Describe what you want to create or edit. For example: Remove the background, change the sky to sunset, add mountains in the background..."
                      className="min-h-[120px] mt-2"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Use natural language to describe what you want to generate or change
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 space-y-4">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className="w-full h-12 text-base"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Now
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Powered by Gemini 2.5 Flash</span>
                  <Button variant="link" className="h-auto p-0 text-primary">
                    API Info
                  </Button>
                </div>
              </div>
            </Card>

            {/* Settings Card */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Advanced Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="model">AI Model</Label>
                  <select id="model" className="w-full mt-2 px-3 py-2 border rounded-md bg-background">
                    <option>Gemini 2.5 Flash Image (Recommended)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="style">Style Preset</Label>
                  <select id="style" className="w-full mt-2 px-3 py-2 border rounded-md bg-background">
                    <option>Auto</option>
                    <option>Photorealistic</option>
                    <option>Artistic</option>
                    <option>Anime</option>
                    <option>Digital Art</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="quality">Output Quality</Label>
                  <select id="quality" className="w-full mt-2 px-3 py-2 border rounded-md bg-background">
                    <option>Standard (720p)</option>
                    <option>HD (1080p)</option>
                    <option>Ultra HD (4K)</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Panel - Output */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Output Gallery</h3>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-3">
                    <Sparkles className="w-12 h-12 text-primary animate-pulse" />
                    <p className="text-sm text-muted-foreground">AI is working its magic...</p>
                    <p className="text-xs text-muted-foreground">This may take a few seconds</p>
                  </div>
                ) : generatedImage ? (
                  <img src={generatedImage} alt="Generated" className="w-full h-full object-contain rounded" />
                ) : (
                  <div className="text-center text-muted-foreground p-8">
                    <ImageIcon className="w-16 h-16 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Your generated image will appear here</p>
                    <p className="text-xs mt-2">Upload an image or enter a prompt to get started</p>
                  </div>
                )}
              </div>

              {generatedImage && !isGenerating && (
                <div className="mt-4 flex gap-2">
                  <Button onClick={handleDownload} variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button onClick={handleShare} variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button onClick={handleGenerate} variant="outline" className="flex-1">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              )}
            </Card>

            {/* Recent Generations */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Recent Generations</h3>
              <div className="grid grid-cols-3 gap-3">
                {generationHistory.length > 0 ? (
                  generationHistory.map((img, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-muted rounded-lg overflow-hidden hover:ring-2 hover:ring-primary cursor-pointer transition-all"
                      onClick={() => setGeneratedImage(img)}
                    >
                      <img src={img} alt={`Generation ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))
                ) : (
                  <>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="aspect-square bg-muted rounded-lg flex items-center justify-center"
                      >
                        <span className="text-xs text-muted-foreground">#{i}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose PixelForge Image Editor?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Editing</h3>
              <p className="text-sm text-muted-foreground">
                Use natural language to describe your edits and let AI do the work
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">One-Shot Editing</h3>
              <p className="text-sm text-muted-foreground">
                Transform your images in seconds with a single prompt
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">High Quality Output</h3>
              <p className="text-sm text-muted-foreground">
                Generate professional-grade results powered by Gemini 2.5 Flash
              </p>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">Copyright 2025 © PixelForge</div>
        </div>
      </footer>
    </div>
  )
}

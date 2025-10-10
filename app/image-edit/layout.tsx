import { Header } from "@/components/header"

export default function ImageEditLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

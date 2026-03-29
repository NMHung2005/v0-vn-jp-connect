import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
    </div>
  )
}

import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { ProfilePreviewSection } from "@/components/landing/profile-preview-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProfilePreviewSection />
      </main>
      <Footer />
    </div>
  )
}

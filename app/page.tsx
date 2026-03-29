import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { ProfilePreviewSection } from "@/components/landing/profile-preview-section"
import { SafetySection } from "@/components/landing/safety-section"
import { RegistrationForm } from "@/components/landing/registration-form"
import { LoginForm } from "@/components/landing/login-form"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProfilePreviewSection />
        <SafetySection />
        <RegistrationForm />
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}

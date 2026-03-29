"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Shield, MessageCircle } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 to-background" />
      
      <div className="relative max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight text-balance">
          Simply connected.
          <br />
          Building the future.
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          A platform directly connecting Vietnamese and Japanese people for language exchange, friendship, and authentic cultural partnerships.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto gap-2" asChild>
            <a href="#register">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
            <a href="#how-it-works">Learn More</a>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border border-border">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">5,000+ Members</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border border-border">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Verified Profiles</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border border-border">
            <MessageCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Safe Connections</span>
          </div>
        </div>
      </div>
    </section>
  )
}

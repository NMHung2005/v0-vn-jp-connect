"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/30 to-background" />
      
      <div className="relative max-w-4xl mx-auto text-center">
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
            <Link href="/register">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

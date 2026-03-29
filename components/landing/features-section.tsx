import { Globe, Calendar, MessageSquare, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Language Exchange",
    description:
      "Practice Vietnamese or Japanese with native speakers. Learn naturally through real conversations.",
  },
  {
    icon: Calendar,
    title: "Community Events",
    description:
      "Join cultural meetups, language cafes, and networking events organized by our community.",
  },
  {
    icon: MessageSquare,
    title: "Direct Messaging",
    description:
      "Connect directly with members who share your interests. No intermediaries, no barriers.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Safety",
    description:
      "All profiles are verified. Meet with confidence knowing our community is trustworthy.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Features
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Everything you need to connect
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform provides all the tools for meaningful cross-cultural connections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-5 p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

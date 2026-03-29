import { Shield, UserCheck, MapPin, AlertTriangle } from "lucide-react"

const safetyFeatures = [
  {
    icon: UserCheck,
    title: "Profile Verification",
    description:
      "All users go through identity verification to ensure authenticity and build trust.",
  },
  {
    icon: Shield,
    title: "Community Guidelines",
    description:
      "Clear rules and active moderation keep our community respectful and welcoming.",
  },
  {
    icon: MapPin,
    title: "Safe Meeting Places",
    description:
      "We recommend and organize meetups at verified public venues and community events.",
  },
  {
    icon: AlertTriangle,
    title: "Report System",
    description:
      "Easy reporting tools and responsive support team to address any concerns quickly.",
  },
]

export function SafetySection() {
  return (
    <section id="safety" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Your Safety Matters
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Connect with confidence
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We prioritize your safety with multiple layers of protection and verification.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyFeatures.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-card border border-border text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

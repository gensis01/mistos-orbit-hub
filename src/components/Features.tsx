import { Zap, Shield, Palette, Battery, Cpu, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Blazing Fast",
    description: "Optimized performance for smooth, lag-free experience",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Enhanced privacy features and regular security updates",
  },
  {
    icon: Palette,
    title: "Customizable",
    description: "Extensive theming options and personalization features",
  },
  {
    icon: Battery,
    title: "Battery Optimized",
    description: "Intelligent power management for all-day battery life",
  },
  {
    icon: Cpu,
    title: "Performance Tuned",
    description: "Fine-tuned system performance and resource management",
  },
  {
    icon: Sparkles,
    title: "Latest Features",
    description: "Built on Android 16 with cutting-edge capabilities",
  },
];

const Features = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Why Choose MistOS?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A perfect blend of performance, features, and aesthetics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--glow-cyan)] group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

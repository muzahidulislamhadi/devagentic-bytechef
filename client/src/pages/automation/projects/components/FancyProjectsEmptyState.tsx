import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bot,
  Code2,
  FolderPlus,
  Globe,
  Rocket,
  Shield,
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';
import { ReactNode } from 'react';

interface FancyProjectsEmptyStateProps {
  createProjectButton: ReactNode;
}

const FancyProjectsEmptyState = ({ createProjectButton }: FancyProjectsEmptyStateProps) => {
  const features = [
    {
      icon: <Bot className="h-5 w-5 text-primary" />,
      title: "AI-Powered Workflows",
      description: "Smart automation that learns and adapts to your business needs."
    },
    {
      icon: <Code2 className="h-5 w-5 text-primary" />,
      title: "No-Code Builder",
      description: "Visual workflow designer with drag-and-drop simplicity."
    },
    {
      icon: <Zap className="h-5 w-5 text-primary" />,
      title: "Lightning Fast",
      description: "Execute workflows at incredible speeds with optimized performance."
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "Enterprise Security",
      description: "Bank-grade security with SOC 2 compliance and encryption."
    },
    {
      icon: <Globe className="h-5 w-5 text-primary" />,
      title: "Global Scale",
      description: "Deploy anywhere with multi-cloud support and reliability."
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
      title: "Smart Analytics",
      description: "Deep insights with real-time monitoring and optimization."
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime SLA" },
    { number: "500+", label: "Integrations" },
    { number: "50ms", label: "Avg Response" }
  ];

  return (
    <div className="w-full px-4 py-6 sm:py-8 bg-gradient-to-br from-background via-background/95 to-muted/30">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Main Hero Section */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-primary ring-1 ring-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
            <Sparkles className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
            Welcome to DevAgentic Projects
          </div>

          <div className="space-y-3 sm:space-y-4 animate-in fade-in-0 slide-in-from-bottom-6 duration-1000 delay-300">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-full blur-2xl opacity-30"></div>
              <FolderPlus className="relative mx-auto h-12 w-12 sm:h-16 sm:w-16 text-primary" />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent leading-tight">
              Start Building
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Amazing Projects
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              Transform your ideas into powerful automation workflows.
              Connect applications, streamline processes, and scale your business with enterprise-grade reliability.
            </p>
          </div>

          <div className="animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 delay-500">
            <div className="inline-flex">
              {createProjectButton}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-700">
          <div className="grid grid-cols-3 gap-4 sm:gap-6 py-4 sm:py-6 px-4 sm:px-6 bg-muted/20 rounded-xl border border-border/50 backdrop-blur-sm">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-900">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
              Everything You Need to Succeed
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Powerful tools and features designed for modern businesses
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105 bg-card/50 backdrop-blur-sm group"
              >
                <CardHeader className="space-y-2 pb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-sm sm:text-base font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-1100">
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl p-4 sm:p-6 border border-primary/20">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Rocket className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Ready to Get Started?</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Create your first project and experience the power of professional automation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FancyProjectsEmptyState;

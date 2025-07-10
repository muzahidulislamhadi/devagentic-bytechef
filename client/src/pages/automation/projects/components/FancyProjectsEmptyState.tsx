import { FolderPlus, Sparkles } from 'lucide-react';
import { ReactNode } from 'react';

interface FancyProjectsEmptyStateProps {
  createProjectButton: ReactNode;
}

const FancyProjectsEmptyState = ({ createProjectButton }: FancyProjectsEmptyStateProps) => {
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


      </div>
    </div>
  );
};

export default FancyProjectsEmptyState;

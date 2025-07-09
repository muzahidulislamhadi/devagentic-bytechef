import reactLogo from '@/assets/logo-long.png';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModeType, useModeTypeStore } from '@/pages/home/stores/useModeTypeStore';
import { useFeatureFlagsStore } from '@/shared/stores/useFeatureFlagsStore';
import {
    Bot,
    Code2,
    Globe,
    Layers3,
    Lightning,
    Rocket,
    Shield,
    Sparkles,
    TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const { setCurrentType } = useModeTypeStore();
    const ff_520 = useFeatureFlagsStore()('ff-520');

    const handleGetStarted = (mode: ModeType) => {
        setCurrentType(mode);
        if (mode === ModeType.AUTOMATION) {
            navigate('/automation');
        } else if (mode === ModeType.EMBEDDED) {
            navigate('/embedded');
        }
    };

    const features = [
        {
            icon: <Bot className="h-8 w-8 text-primary" />,
            title: "AI-Powered Automation",
            description: "Intelligent workflows that adapt and optimize themselves using advanced AI algorithms."
        },
        {
            icon: <Code2 className="h-8 w-8 text-primary" />,
            title: "No-Code Integration",
            description: "Connect applications seamlessly without writing a single line of code."
        },
        {
            icon: <Lightning className="h-8 w-8 text-primary" />,
            title: "Lightning Fast",
            description: "Execute workflows at incredible speeds with our optimized execution engine."
        },
        {
            icon: <Shield className="h-8 w-8 text-primary" />,
            title: "Enterprise Security",
            description: "Bank-grade security with SOC 2 compliance and end-to-end encryption."
        },
        {
            icon: <Globe className="h-8 w-8 text-primary" />,
            title: "Global Scale",
            description: "Deploy anywhere with multi-cloud support and global CDN infrastructure."
        },
        {
            icon: <Sparkles className="h-8 w-8 text-primary" />,
            title: "Smart Analytics",
            description: "Deep insights into your workflows with real-time monitoring and analytics."
        }
    ];

    const stats = [
        { number: "99.9%", label: "Uptime Guarantee" },
        { number: "10M+", label: "Tasks Automated" },
        { number: "500+", label: "Integrations" },
        { number: "50ms", label: "Average Response" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <img src={reactLogo} alt="DevAgentic" className="h-8 w-auto" />
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center rounded-full bg-primary/10 px-6 py-2 text-sm font-medium text-primary ring-1 ring-primary/20">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Introducing the Future of Integration
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent leading-tight">
                            Automate Everything.
                            <br />
                            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                                Scale Infinitely.
                            </span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                            The most powerful integration platform on the planet. Connect any application,
                            automate any workflow, and scale to infinity with enterprise-grade reliability.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            {ff_520 ? (
                                <>
                                    <Button
                                        size="lg"
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                                        onClick={() => handleGetStarted(ModeType.AUTOMATION)}
                                    >
                                        <Rocket className="mr-2 h-5 w-5" />
                                        Start Automating
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-2 px-8 py-6 text-lg font-semibold rounded-xl hover:bg-accent/50 transition-all duration-300"
                                        onClick={() => handleGetStarted(ModeType.EMBEDDED)}
                                    >
                                        <Code2 className="mr-2 h-5 w-5" />
                                        Embed Integrations
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                                    onClick={() => navigate('/automation')}
                                >
                                    <Rocket className="mr-2 h-5 w-5" />
                                    Get Started Now
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-muted-foreground font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                            Why Choose DevAgentic?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Built for enterprises that demand the best. Every feature designed for scale,
                            security, and developer happiness.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-105 bg-card/50 backdrop-blur-sm">
                                <CardHeader className="space-y-4">
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-xl font-bold">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Join thousands of companies already automating their workflows with DevAgentic.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {ff_520 ? (
                                <>
                                    <Button
                                        size="lg"
                                        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                                        onClick={() => handleGetStarted(ModeType.AUTOMATION)}
                                    >
                                        <TrendingUp className="mr-2 h-5 w-5" />
                                        Start Free Trial
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-2 px-8 py-6 text-lg font-semibold rounded-xl hover:bg-accent/50 transition-all duration-300"
                                        onClick={() => handleGetStarted(ModeType.EMBEDDED)}
                                    >
                                        <Layers3 className="mr-2 h-5 w-5" />
                                        View Integration Options
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                                    onClick={() => navigate('/automation')}
                                >
                                    <TrendingUp className="mr-2 h-5 w-5" />
                                    Get Started Now
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-muted-foreground">
                        © 2024 DevAgentic. All rights reserved. Built with ❤️ for developers.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;

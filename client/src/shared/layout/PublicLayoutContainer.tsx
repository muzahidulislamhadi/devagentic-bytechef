import reactLogo from '@/assets/logo-long.png';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from '@/components/ui/toaster';
import { PropsWithChildren } from 'react';

const PublicLayoutContainer = ({ children }: PropsWithChildren) => {
    return (
        <>
            <div className="grid size-full place-items-center bg-background text-foreground">
                <div className="absolute top-4 right-4">
                    <ThemeToggle />
                </div>

                <div className="w-full">
                    <div className="mb-8 flex items-center justify-center">
                        <img alt="DevAgentic" className="h-12 w-auto" src={reactLogo} />
                    </div>

                    {children}
                </div>
            </div>

            <Toaster />
        </>
    );
};

export default PublicLayoutContainer;

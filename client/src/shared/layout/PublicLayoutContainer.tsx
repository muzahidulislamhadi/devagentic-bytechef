import reactLogo from '@/assets/logo.png';
import { Toaster } from '@/components/ui/toaster';
import { PropsWithChildren } from 'react';

const PublicLayoutContainer = ({ children }: PropsWithChildren) => {
    return (
        <>
            <div className="grid size-full place-items-center">
                <div className="w-full">
                    <div className="mb-8 flex items-center justify-center space-x-2">
                        <img alt="DevAgentic" className="h-12 w-auto" src={reactLogo} />

                        <span className="text-xl font-semibold">DevAgentic</span>
                    </div>

                    {children}
                </div>
            </div>

            <Toaster />
        </>
    );
};

export default PublicLayoutContainer;

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link, useLocation } from 'react-router-dom';

import './DesktopSidebar.css';

import reactLogo from '@/assets/logo.png';
import DesktopSidebarBottomMenu from '@/shared/layout/desktop-sidebar/DesktopSidebarBottomMenu';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export function DesktopSidebar({
    className,
    navigation,
}: {
    className?: string;
    navigation: {
        name: string;
        href: string;
        icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>;
    }[];
}) {
    const { pathname } = useLocation();

    return (
        <aside className={twMerge('hidden bg-muted lg:flex lg:shrink-0', className)}>
            <div className="flex w-sidebar-width border-r border-r-border/50 bg-muted/30">
                <div className="flex min-h-0 flex-1 flex-col">
                    <div className="flex-1">
                        <div className="flex items-center justify-center py-4">
                            <Link to="/">
                                <img alt="DevAgentic" className="h-12 w-auto cursor-pointer" src={reactLogo} />
                            </Link>
                        </div>

                        <nav aria-label="Sidebar" className="flex flex-col items-center overflow-y-auto">
                            {navigation.map((item) => (
                                <div className="p-0.5" key={item.name}>
                                    <Link
                                        className={twMerge(
                                            'flex items-center rounded-lg p-3 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                                            pathname.includes(item.href) && 'bg-accent text-accent-foreground'
                                        )}
                                        to={item.href}
                                    >
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <item.icon aria-hidden="true" className="size-6" />
                                            </TooltipTrigger>

                                            <TooltipContent side="right">{item.name}</TooltipContent>
                                        </Tooltip>

                                        <span className="sr-only">{item.name}</span>
                                    </Link>
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div className="flex shrink-0 flex-col items-center justify-center gap-4 py-4">
                        <DesktopSidebarBottomMenu />
                    </div>
                </div>
            </div>
        </aside>
    );
}

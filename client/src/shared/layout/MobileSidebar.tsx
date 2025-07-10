import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAnalytics } from '@/shared/hooks/useAnalytics';
import { useAuthenticationStore } from '@/shared/stores/useAuthenticationStore';
import { useQueryClient } from '@tanstack/react-query';

import reactLogo from '@/assets/logo.png';

interface MobileSidebarProps {
    user: { name: string; email: string; imageUrl: string };
    navigation: {
        name: string;
        href: string;
        icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, 'ref'>>;
    }[];
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (value: boolean) => void;
}

export function MobileSidebar({ mobileMenuOpen, navigation, setMobileMenuOpen, user }: MobileSidebarProps) {
    const { logout } = useAuthenticationStore();
    const analytics = useAnalytics();
    const queryClient = useQueryClient();

    const handleLogOutClick = () => {
        analytics.reset();
        queryClient.resetQueries();
        logout();
        setMobileMenuOpen(false);
    };

    return (
        <Dialog onOpenChange={setMobileMenuOpen} open={mobileMenuOpen}>
            <DialogContent className="flex h-full flex-col bg-background p-0 focus:outline-none">
                {/*<div className="absolute right-4 top-0 pt-4">*/}

                {/*    <button*/}

                {/*        className="ml-1 items-center justify-center rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"*/}

                {/*        onClick={() => setMobileMenuOpen(false)}*/}

                {/*    >*/}

                {/*        <span className="sr-only">Close sidebar</span>*/}

                {/*        <Cross2Icon aria-hidden="true" className="size-4 cursor-pointer" />*/}

                {/*    </button>*/}

                {/*</div>*/}

                <div className="pb-4 pt-5">
                    <div className="flex shrink-0 items-center px-4">
                        <img alt="DevAgentic" className="h-10 w-auto" src={reactLogo} />
                    </div>

                    <nav aria-label="Sidebar" className="mt-5">
                        <div className="space-y-1 px-2">
                            {navigation.map((item) => (
                                <a
                                    className="group flex items-center rounded-md p-2 text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                                    href={item.href}
                                    key={item.name}
                                >
                                    <item.icon
                                        aria-hidden="true"
                                        className="mr-4 size-6 text-muted-foreground group-hover:text-accent-foreground"
                                    />

                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </nav>
                </div>

                <div className="flex shrink-0 border-t border-border p-4">
                    <div className="w-full">
                        <div className="flex items-center mb-3">
                            <div>
                                <img alt="" className="inline-block size-10 rounded-full" src={user.imageUrl} />
                            </div>

                            <div className="ml-3">
                                <p className="text-base font-medium text-foreground">
                                    {user.name}
                                </p>

                                <p className="text-sm font-medium text-muted-foreground">
                                    Account Settings
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleLogOutClick}
                        >
                            Log Out
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

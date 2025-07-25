import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWorkspaceStore } from '@/pages/automation/stores/useWorkspaceStore';
import { ModeType, useModeTypeStore } from '@/pages/home/stores/useModeTypeStore';
import { useAnalytics } from '@/shared/hooks/useAnalytics';

import { useGetUserWorkspacesQuery } from '@/shared/queries/automation/workspaces.queries';
import { useApplicationInfoStore } from '@/shared/stores/useApplicationInfoStore';
import { useAuthenticationStore } from '@/shared/stores/useAuthenticationStore';
import { useFeatureFlagsStore } from '@/shared/stores/useFeatureFlagsStore';
import { PlusIcon } from '@radix-ui/react-icons';
import { useQueryClient } from '@tanstack/react-query';
import { BlendIcon, DiamondIcon, SettingsIcon, User2Icon, UserRoundCogIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DesktopSidebarBottomMenu = () => {
    const { application } = useApplicationInfoStore();
    const { account, logout } = useAuthenticationStore();
    const { currentType, setCurrentType } = useModeTypeStore();
    const { currentWorkspaceId, setCurrentWorkspaceId } = useWorkspaceStore();

    const analytics = useAnalytics();

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const ff_520 = useFeatureFlagsStore()('ff-520');

    /* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
    const { data: workspaces } = useGetUserWorkspacesQuery(account?.id!, !!account);

    const handleLogOutClick = () => {
        analytics.reset();
        queryClient.resetQueries();
        logout();
    };

    const handleModeTypeChange = (value: string) => {
        const selectedType = +value;

        setCurrentType(selectedType);

        if (selectedType === ModeType.AUTOMATION) {
            navigate('/automation');
        } else if (selectedType === ModeType.EMBEDDED) {
            navigate('/embedded');
        }
    };

    const handleWorkflowValueChange = (value: string) => {
        setCurrentWorkspaceId(+value);

        navigate('/automation/projects');
    };

    useEffect(() => {
        if (workspaces && workspaces.length > 0) {
            if (currentWorkspaceId) {
                if (!workspaces.map((workspace) => workspace.id!).find((id) => id === currentWorkspaceId)) {
                    if (workspaces[0]?.id) {
                        setCurrentWorkspaceId(workspaces[0]?.id);
                    }
                }
            } else if (workspaces[0]?.id && !currentWorkspaceId) {
                setCurrentWorkspaceId(workspaces[0]?.id);
            }
        }
    }, [currentWorkspaceId, workspaces, setCurrentWorkspaceId]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarFallback className="bg-muted hover:bg-muted/80 text-muted-foreground">
                        <User2Icon className="size-6" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-64 space-y-2 p-2">
                <div className="flex items-center space-x-2">
                    <Avatar className="cursor-pointer">
                        <AvatarFallback className="bg-muted text-muted-foreground">
                            <User2Icon className="size-6" />
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <div className="text-sm text-muted-foreground">Signed in as</div>

                        <div className="text-foreground">{account?.email}</div>
                    </div>
                </div>

                <DropdownMenuSeparator />

                {ff_520 && (
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer font-semibold">
                            <BlendIcon className="size-5" />

                            <span>Mode: {currentType === 0 ? 'Automation' : 'Embedded'}</span>
                        </DropdownMenuSubTrigger>

                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup
                                    onValueChange={handleModeTypeChange}
                                    value={currentType?.toString()}
                                >
                                    <DropdownMenuRadioItem value="1">Embedded</DropdownMenuRadioItem>

                                    <DropdownMenuRadioItem value="0">Automation</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                )}

                <DropdownMenuSeparator />

                <div className="min-h-52 space-y-1">
                    {pathname.startsWith('/automation') && application?.edition === 'EE' && workspaces && (
                        <>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className="cursor-pointer font-semibold">
                                    <DiamondIcon className="size-5" />

                                    {`Workspace: ${workspaces.find((w) => w.id === currentWorkspaceId)?.name}`}
                                </DropdownMenuSubTrigger>

                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuRadioGroup
                                            onValueChange={handleWorkflowValueChange}
                                            value={currentWorkspaceId?.toString()}
                                        >
                                            {workspaces.map((workspace) => (
                                                <DropdownMenuRadioItem
                                                    key={workspace.id}
                                                    value={workspace.id!.toString()}
                                                >
                                                    {workspace.name}
                                                </DropdownMenuRadioItem>
                                            ))}
                                        </DropdownMenuRadioGroup>

                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem
                                            className="flex space-x-2"
                                            onClick={() => navigate('/automation/settings/workspaces')}
                                        >
                                            <PlusIcon /> <span>New Workspace</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>

                            <DropdownMenuSeparator />
                        </>
                    )}

                    <DropdownMenuItem
                        className="cursor-pointer font-semibold"
                        onClick={() =>
                            navigate(`${pathname.startsWith('/automation') ? '/automation' : '/embedded'}/settings`)
                        }
                    >
                        <div className="flex items-center space-x-1">
                            <SettingsIcon className="size-5" />

                            <span>Settings</span>
                        </div>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="cursor-pointer font-semibold"
                        onClick={() =>
                            navigate(`${pathname.startsWith('/automation') ? '/automation' : '/embedded'}/account`)
                        }
                    >
                        <div className="flex items-center space-x-1">
                            <UserRoundCogIcon className="size-5" />

                            <span>Your account</span>
                        </div>
                    </DropdownMenuItem>

                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer font-semibold" onClick={handleLogOutClick}>
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DesktopSidebarBottomMenu;

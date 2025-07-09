import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {McpComponent, McpServer, useDeleteMcpComponentMutation} from '@/shared/middleware/graphql';
import {useQueryClient} from '@tanstack/react-query';
import {EllipsisVerticalIcon} from 'lucide-react';
import {useState} from 'react';

import McpComponentDialog from '../mcp-component-dialog/McpComponentDialog';
import McpComponentListItemAlertDialog from './McpComponentListItemAlertDialog';

interface McpComponentListItemDropDownProps {
    mcpComponent: McpComponent;
    mcpServer: McpServer;
}

const McpComponentListItemDropdownMenu = ({mcpComponent, mcpServer}: McpComponentListItemDropDownProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const queryClient = useQueryClient();

    const deleteMcpComponentMutation = useDeleteMcpComponentMutation({
        onError: () => {
            setIsPending(false);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['mcpComponentsByServerId'],
            });
            setShowDeleteDialog(false);
            setIsPending(false);
        },
    });

    const handleEditClick = () => {
        setIsDialogOpen(true);
    };

    const handleDeleteClick = () => {
        setShowDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        setIsPending(true);
        try {
            await deleteMcpComponentMutation.mutateAsync({
                id: mcpComponent.id.toString(),
            });
        } catch (error) {
            console.error('Error deleting MCP component:', error);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteDialog(false);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                        <EllipsisVerticalIcon className="size-4 hover:cursor-pointer" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleEditClick}>
                        <span className="w-full">Edit</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="text-destructive" onClick={handleDeleteClick}>
                        <span className="w-full">Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <McpComponentDialog
                mcpComponent={mcpComponent}
                mcpServerId={mcpServer.id}
                onOpenChange={setIsDialogOpen}
                open={isDialogOpen}
            />

            {showDeleteDialog && (
                <McpComponentListItemAlertDialog
                    isPending={isPending}
                    onCancelClick={handleCancelDelete}
                    onDeleteClick={handleConfirmDelete}
                />
            )}
        </>
    );
};

export default McpComponentListItemDropdownMenu;

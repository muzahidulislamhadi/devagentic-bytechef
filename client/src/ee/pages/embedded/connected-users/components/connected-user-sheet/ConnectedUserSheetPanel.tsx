import ConnectedUserSheetPanelIntegrationList from '@/ee/pages/embedded/connected-users/components/connected-user-sheet/ConnectedUserSheetPanelIntegrationList';
import ConnectedUserSheetPanelProfile from '@/ee/pages/embedded/connected-users/components/connected-user-sheet/ConnectedUserSheetPanelProfile';
import {ConnectedUser} from '@/ee/shared/middleware/embedded/connected-user';

interface ConnectedUserSheetPanelProps {
    connectedUser: ConnectedUser;
}

const ConnectedUserSheetPanel = ({connectedUser}: ConnectedUserSheetPanelProps) => {
    return (
        <div className="flex w-full flex-col gap-4 pt-4">
            <div className="flex w-full flex-col space-x-4">
                <div className="w-full space-y-10">
                    <div className="w-full space-y-2">
                        <div className="text-base font-semibold">Profile</div>

                        <ConnectedUserSheetPanelProfile connectedUser={connectedUser} />
                    </div>

                    <div className="w-full space-y-2">
                        <div className="px-2 text-base font-semibold">Integrations</div>

                        {connectedUser.integrationInstances && (
                            <ConnectedUserSheetPanelIntegrationList
                                connectedUserId={connectedUser.id!}
                                connectedUserIntegrationInstances={connectedUser.integrationInstances}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConnectedUserSheetPanel;

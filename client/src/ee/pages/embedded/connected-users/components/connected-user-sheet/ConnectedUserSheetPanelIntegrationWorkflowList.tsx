import ConnectedUserSheetPanelIntegrationWorkflowListItem from '@/ee/pages/embedded/connected-users/components/connected-user-sheet/ConnectedUserSheetPanelIntegrationWorkflowListItem';
import {
    IntegrationInstance,
    IntegrationInstanceConfiguration,
    Workflow,
} from '@/ee/shared/middleware/embedded/configuration';
import {ComponentDefinitionBasic} from '@/shared/middleware/platform/configuration';

const ConnectedUserSheetPanelIntegrationWorkflowList = ({
    componentDefinitions,
    integrationInstance,
    integrationInstanceConfiguration,
    workflows,
}: {
    componentDefinitions: ComponentDefinitionBasic[];
    integrationInstance: IntegrationInstance;
    integrationInstanceConfiguration: IntegrationInstanceConfiguration;
    workflows: Workflow[];
}) => {
    return (
        <div className="flex w-full flex-col py-3 pl-4">
            <h3 className="flex justify-start px-2 text-sm font-semibold uppercase text-muted-foreground">Workflows</h3>

            {workflows.length > 0 ? (
                <ul>
                    {workflows.map((workflow) => {
                        const integrationInstanceWorkflow = integrationInstance?.integrationInstanceWorkflows?.find(
                            (integrationInstanceWorkflow) => integrationInstanceWorkflow.workflowId === workflow.id
                        );

                        const integrationInstanceConfigurationWorkflow =
                            integrationInstanceConfiguration.integrationInstanceConfigurationWorkflows?.find(
                                (integrationInstanceConfigurationWorkflow) =>
                                    integrationInstanceConfigurationWorkflow.workflowId === workflow.id
                            );

                        return (
                            integrationInstance &&
                            integrationInstanceConfigurationWorkflow && (
                                <ConnectedUserSheetPanelIntegrationWorkflowListItem
                                    componentDefinitions={componentDefinitions}
                                    integrationInstance={integrationInstance}
                                    integrationInstanceConfigurationWorkflow={integrationInstanceConfigurationWorkflow}
                                    integrationInstanceWorkflow={integrationInstanceWorkflow}
                                    key={workflow.id}
                                    workflow={workflow}
                                />
                            )
                        );
                    })}
                </ul>
            ) : (
                <div className="p-2 text-sm">No defined workflows.</div>
            )}
        </div>
    );
};

export default ConnectedUserSheetPanelIntegrationWorkflowList;

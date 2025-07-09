import {Skeleton} from '@/components/ui/skeleton';
import IntegrationInstanceConfigurationWorkflowListItem from '@/ee/pages/embedded/integration-instance-configurations/components/integration-instance-configuration-workflow-list/IntegrationInstanceConfigurationWorkflowListItem';
import {IntegrationInstanceConfigurationWorkflow} from '@/ee/shared/middleware/embedded/configuration';
import {useGetComponentDefinitionsQuery} from '@/ee/shared/queries/embedded/componentDefinitions.queries';
import {useGetIntegrationVersionWorkflowsQuery} from '@/ee/shared/queries/embedded/integrationWorkflows.queries';
import {ComponentDefinitionBasic} from '@/shared/middleware/platform/configuration';
import {useGetTaskDispatcherDefinitionsQuery} from '@/shared/queries/platform/taskDispatcherDefinitions.queries';

const IntegrationInstanceConfigurationWorkflowList = ({
    componentName,
    integrationId,
    integrationInstanceConfigurationId,
    integrationInstanceConfigurationWorkflows,
    integrationVersion,
}: {
    componentName: string;
    integrationId: number;
    integrationInstanceConfigurationId: number;
    integrationInstanceConfigurationWorkflows?: Array<IntegrationInstanceConfigurationWorkflow>;
    integrationVersion: number;
}) => {
    const {data: componentDefinitions, isLoading: isComponentDefinitionsLoading} = useGetComponentDefinitionsQuery({
        actionDefinitions: true,
        triggerDefinitions: true,
    });

    const {data: taskDispatcherDefinitions, isLoading: isTaskDispatcherDefinitionsLoading} =
        useGetTaskDispatcherDefinitionsQuery();

    const {data: workflows, isLoading: isIntegrationWorkflowsLoading} = useGetIntegrationVersionWorkflowsQuery(
        integrationId,
        integrationVersion
    );

    const workflowComponentDefinitions: {
        [key: string]: ComponentDefinitionBasic | undefined;
    } = {};

    const workflowTaskDispatcherDefinitions: {
        [key: string]: ComponentDefinitionBasic | undefined;
    } = {};

    return isComponentDefinitionsLoading || isTaskDispatcherDefinitionsLoading || isIntegrationWorkflowsLoading ? (
        <div className="space-y-3 py-2">
            <Skeleton className="h-5 w-40" />

            {[1, 2].map((value) => (
                <div className="flex items-center space-x-4" key={value}>
                    <Skeleton className="h-4 w-80" />

                    <div className="flex w-60 items-center space-x-1">
                        <Skeleton className="h-6 w-7 rounded-full" />

                        <Skeleton className="size-7 rounded-full" />

                        <Skeleton className="size-7 rounded-full" />
                    </div>

                    <Skeleton className="h-4 flex-1" />
                </div>
            ))}
        </div>
    ) : (
        <div className="border-b border-b-gray-100 py-3 pl-4">
            <h3 className="flex justify-start px-2 text-sm font-semibold uppercase text-gray-400">Workflows</h3>

            <ul className="divide-y divide-gray-100">
                {workflows &&
                    workflows
                        .sort((a, b) => a.label!.localeCompare(b.label!))
                        .map((workflow) => {
                            const componentNames = [
                                ...(workflow.workflowTriggerComponentNames ?? []),
                                ...(workflow.workflowTaskComponentNames ?? []),
                            ];

                            componentNames?.forEach((componentName) => {
                                if (!workflowComponentDefinitions[componentName]) {
                                    workflowComponentDefinitions[componentName] = componentDefinitions?.find(
                                        (componentDefinition) => componentDefinition.name === componentName
                                    );
                                }

                                if (!workflowTaskDispatcherDefinitions[componentName]) {
                                    workflowTaskDispatcherDefinitions[componentName] = taskDispatcherDefinitions?.find(
                                        (taskDispatcherDefinition) => taskDispatcherDefinition.name === componentName
                                    );
                                }
                            });

                            const filteredComponentNames = componentNames?.filter(
                                (item, index) => componentNames?.indexOf(item) === index
                            );

                            const integrationInstanceConfigurationWorkflow =
                                integrationInstanceConfigurationWorkflows?.find(
                                    (integrationInstanceConfigurationWorkflow) =>
                                        integrationInstanceConfigurationWorkflow.workflowId === workflow?.id
                                );

                            if (!integrationInstanceConfigurationWorkflow) {
                                return <></>;
                            }

                            return (
                                <IntegrationInstanceConfigurationWorkflowListItem
                                    componentName={componentName}
                                    filteredComponentNames={filteredComponentNames}
                                    integrationInstanceConfigurationId={integrationInstanceConfigurationId}
                                    integrationInstanceConfigurationWorkflow={integrationInstanceConfigurationWorkflow}
                                    key={workflow.id}
                                    workflow={workflow}
                                    workflowComponentDefinitions={workflowComponentDefinitions}
                                    workflowTaskDispatcherDefinitions={workflowTaskDispatcherDefinitions}
                                />
                            );
                        })}
            </ul>
        </div>
    );
};

export default IntegrationInstanceConfigurationWorkflowList;

import ComboBox, {ComboBoxItemType} from '@/components/ComboBox/ComboBox';
import {Integration, IntegrationStatus} from '@/ee/shared/middleware/embedded/configuration';
import {useGetComponentDefinitionsQuery} from '@/ee/shared/queries/embedded/componentDefinitions.queries';
import {useGetIntegrationsQuery} from '@/ee/shared/queries/embedded/integrations.queries';
import {ComponentDefinitionBasic} from '@/shared/middleware/platform/configuration';
import {FocusEventHandler} from 'react';
import InlineSVG from 'react-inlinesvg';

const IntegrationLabel = ({
    componentDefinition,
    integration,
}: {
    componentDefinition: ComponentDefinitionBasic;
    integration: Integration;
}) => (
    <div className="flex items-center gap-2">
        {componentDefinition?.icon && <InlineSVG className="size-6 flex-none" src={componentDefinition.icon} />}

        <span className="mr-1">{integration.name}</span>

        <span className="text-xs text-gray-500">{integration?.tags?.map((tag) => tag.name).join(', ')}</span>
    </div>
);

const IntegrationInstanceConfigurationDialogBasicStepIntegrationsComboBox = ({
    onBlur,
    onChange,
    value,
}: {
    onBlur: FocusEventHandler;
    onChange: (item?: ComboBoxItemType) => void;
    value?: number;
}) => {
    const {data: componentDefinitions} = useGetComponentDefinitionsQuery({
        connectionDefinitions: true,
    });

    const {data: integrations} = useGetIntegrationsQuery({
        includeAllFields: false,
        status: IntegrationStatus.Published,
    });

    return integrations && componentDefinitions ? (
        <ComboBox
            emptyMessage="No published integrations found. Please publish an integration first."
            items={integrations.map((integration) => {
                const componentDefinition = componentDefinitions.filter(
                    (componentDefinition) => componentDefinition.name === integration.componentName
                )[0];

                return {
                    label: <IntegrationLabel componentDefinition={componentDefinition} integration={integration} />,
                    name: integration.name,
                    value: integration.id,
                } as ComboBoxItemType;
            })}
            name="integrationId"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
        />
    ) : (
        <>Loading...</>
    );
};

export default IntegrationInstanceConfigurationDialogBasicStepIntegrationsComboBox;

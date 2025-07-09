/* eslint-disable sort-keys */
import {
    ConnectionDefinition,
    ConnectionDefinitionApi,
    GetComponentConnectionDefinitionRequest,
    GetComponentConnectionDefinitionsRequest,
} from '@/shared/middleware/platform/configuration';
import {useQuery} from '@tanstack/react-query';

export const ConnectDefinitionKeys = {
    connectionDefinition: (request?: GetComponentConnectionDefinitionRequest) => [
        ...ConnectDefinitionKeys.connectionDefinitions,
        request?.componentName,
        request?.componentVersion,
    ],
    connectionDefinitions: ['connectionDefinitions'],
    filteredConnectionDefinitions: (request: GetComponentConnectionDefinitionsRequest) => [
        ...ConnectDefinitionKeys.connectionDefinitions,
        request,
    ],
};

export const useGetConnectionDefinitionQuery = (request: GetComponentConnectionDefinitionRequest) =>
    useQuery<ConnectionDefinition, Error>({
        queryKey: ConnectDefinitionKeys.connectionDefinition(request),
        queryFn: () => new ConnectionDefinitionApi().getComponentConnectionDefinition(request),
        enabled: !!request?.componentName,
    });

export const useGetConnectionDefinitionsQuery = (request: GetComponentConnectionDefinitionsRequest) =>
    useQuery<ConnectionDefinition[], Error>({
        queryKey: ConnectDefinitionKeys.filteredConnectionDefinitions(request),
        queryFn: () => new ConnectionDefinitionApi().getComponentConnectionDefinitions(request),
        enabled: !!request?.componentName,
    });

/* tslint:disable */
/* eslint-disable */
/**
 * The Platform Configuration Internal API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  ComponentDefinition,
  ComponentDefinitionBasic,
  UnifiedApiCategory,
} from '../models/index';
import {
    ComponentDefinitionFromJSON,
    ComponentDefinitionToJSON,
    ComponentDefinitionBasicFromJSON,
    ComponentDefinitionBasicToJSON,
    UnifiedApiCategoryFromJSON,
    UnifiedApiCategoryToJSON,
} from '../models/index';

export interface GetComponentDefinitionRequest {
    componentName: string;
    componentVersion: number;
}

export interface GetComponentDefinitionVersionsRequest {
    componentName: string;
}

export interface GetConnectionComponentDefinitionRequest {
    componentName: string;
    connectionVersion: number;
}

export interface GetUnifiedApiComponentDefinitionsRequest {
    category: UnifiedApiCategory;
}

/**
 * 
 */
export class ComponentDefinitionApi extends runtime.BaseAPI {

    /**
     * Get a component definition.
     * Get a component definition
     */
    async getComponentDefinitionRaw(requestParameters: GetComponentDefinitionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ComponentDefinition>> {
        if (requestParameters['componentName'] == null) {
            throw new runtime.RequiredError(
                'componentName',
                'Required parameter "componentName" was null or undefined when calling getComponentDefinition().'
            );
        }

        if (requestParameters['componentVersion'] == null) {
            throw new runtime.RequiredError(
                'componentVersion',
                'Required parameter "componentVersion" was null or undefined when calling getComponentDefinition().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/component-definitions/{componentName}/versions/{componentVersion}`.replace(`{${"componentName"}}`, encodeURIComponent(String(requestParameters['componentName']))).replace(`{${"componentVersion"}}`, encodeURIComponent(String(requestParameters['componentVersion']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ComponentDefinitionFromJSON(jsonValue));
    }

    /**
     * Get a component definition.
     * Get a component definition
     */
    async getComponentDefinition(requestParameters: GetComponentDefinitionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ComponentDefinition> {
        const response = await this.getComponentDefinitionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get all component definition versions of a component.
     * Get all component definition versions of a component
     */
    async getComponentDefinitionVersionsRaw(requestParameters: GetComponentDefinitionVersionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ComponentDefinitionBasic>>> {
        if (requestParameters['componentName'] == null) {
            throw new runtime.RequiredError(
                'componentName',
                'Required parameter "componentName" was null or undefined when calling getComponentDefinitionVersions().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/component-definitions/{componentName}/versions`.replace(`{${"componentName"}}`, encodeURIComponent(String(requestParameters['componentName']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ComponentDefinitionBasicFromJSON));
    }

    /**
     * Get all component definition versions of a component.
     * Get all component definition versions of a component
     */
    async getComponentDefinitionVersions(requestParameters: GetComponentDefinitionVersionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ComponentDefinitionBasic>> {
        const response = await this.getComponentDefinitionVersionsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get a connection component definition.
     * Get a connection component definition
     */
    async getConnectionComponentDefinitionRaw(requestParameters: GetConnectionComponentDefinitionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ComponentDefinition>> {
        if (requestParameters['componentName'] == null) {
            throw new runtime.RequiredError(
                'componentName',
                'Required parameter "componentName" was null or undefined when calling getConnectionComponentDefinition().'
            );
        }

        if (requestParameters['connectionVersion'] == null) {
            throw new runtime.RequiredError(
                'connectionVersion',
                'Required parameter "connectionVersion" was null or undefined when calling getConnectionComponentDefinition().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/component-definitions/{componentName}/connection-versions/{connectionVersion}`.replace(`{${"componentName"}}`, encodeURIComponent(String(requestParameters['componentName']))).replace(`{${"connectionVersion"}}`, encodeURIComponent(String(requestParameters['connectionVersion']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ComponentDefinitionFromJSON(jsonValue));
    }

    /**
     * Get a connection component definition.
     * Get a connection component definition
     */
    async getConnectionComponentDefinition(requestParameters: GetConnectionComponentDefinitionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ComponentDefinition> {
        const response = await this.getConnectionComponentDefinitionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get all compatible component definitions for a unified API category.
     * Get all compatible component definitions for a unified API category
     */
    async getUnifiedApiComponentDefinitionsRaw(requestParameters: GetUnifiedApiComponentDefinitionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ComponentDefinitionBasic>>> {
        if (requestParameters['category'] == null) {
            throw new runtime.RequiredError(
                'category',
                'Required parameter "category" was null or undefined when calling getUnifiedApiComponentDefinitions().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/unified-api/{category}/component-definitions`.replace(`{${"category"}}`, encodeURIComponent(String(requestParameters['category']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ComponentDefinitionBasicFromJSON));
    }

    /**
     * Get all compatible component definitions for a unified API category.
     * Get all compatible component definitions for a unified API category
     */
    async getUnifiedApiComponentDefinitions(requestParameters: GetUnifiedApiComponentDefinitionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ComponentDefinitionBasic>> {
        const response = await this.getUnifiedApiComponentDefinitionsRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

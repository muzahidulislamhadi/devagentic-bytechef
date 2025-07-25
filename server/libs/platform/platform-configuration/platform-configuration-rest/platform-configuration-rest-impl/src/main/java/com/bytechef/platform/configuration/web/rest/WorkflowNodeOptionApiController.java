/*
 * Copyright 2025 ByteChef
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.bytechef.platform.configuration.web.rest;

import com.bytechef.atlas.coordinator.annotation.ConditionalOnCoordinator;
import com.bytechef.commons.util.CollectionUtils;
import com.bytechef.platform.configuration.facade.WorkflowNodeOptionFacade;
import com.bytechef.platform.configuration.web.rest.model.OptionModel;
import java.util.List;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Ivica Cardic
 */
@RestController
@RequestMapping("${openapi.openAPIDefinition.base-path.platform:}/internal")
@ConditionalOnCoordinator
public class WorkflowNodeOptionApiController implements WorkflowNodeOptionApi {

    private final ConversionService conversionService;
    private final WorkflowNodeOptionFacade workflowNodeOptionFacade;

    public WorkflowNodeOptionApiController(
        ConversionService conversionService, WorkflowNodeOptionFacade workflowNodeOptionFacade) {

        this.conversionService = conversionService;
        this.workflowNodeOptionFacade = workflowNodeOptionFacade;
    }

    @Override
    public ResponseEntity<List<OptionModel>> getClusterElementNodeOptions(
        String workflowId, String workflowNodeName, String clusterElementTypeName, String clusterElementName,
        String propertyName, List<String> lookupDependsOnPaths, String searchText) {

        return ResponseEntity.ok(
            CollectionUtils.map(
                workflowNodeOptionFacade.getClusterElementNodeOptions(
                    workflowId, workflowNodeName, clusterElementTypeName, clusterElementName, propertyName,
                    lookupDependsOnPaths == null ? List.of() : lookupDependsOnPaths, searchText),
                option -> conversionService.convert(option, OptionModel.class)));
    }

    @Override
    public ResponseEntity<List<OptionModel>> getWorkflowNodeOptions(
        String workflowId, String workflowNodeName, String propertyName, List<String> lookupDependsOnPaths,
        String searchText) {

        return ResponseEntity.ok(
            CollectionUtils.map(
                workflowNodeOptionFacade.getWorkflowNodeOptions(
                    workflowId, workflowNodeName, propertyName,
                    lookupDependsOnPaths == null ? List.of() : lookupDependsOnPaths, searchText),
                option -> conversionService.convert(option, OptionModel.class)));
    }
}

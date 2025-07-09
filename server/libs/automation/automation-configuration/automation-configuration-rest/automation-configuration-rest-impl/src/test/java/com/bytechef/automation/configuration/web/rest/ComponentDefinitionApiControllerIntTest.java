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

package com.bytechef.automation.configuration.web.rest;

import com.bytechef.automation.configuration.web.rest.config.AutomationConfigurationRestConfigurationSharedMocks;
import com.bytechef.automation.configuration.web.rest.config.AutomationConfigurationRestTestConfiguration;
import com.bytechef.platform.component.domain.ComponentDefinition;
import com.bytechef.platform.component.service.ComponentDefinitionService;
import com.bytechef.platform.constant.ModeType;
import java.util.List;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.client.MockMvcWebTestClient;

/**
 * @author Ivica Cardic
 */
@Disabled
@ContextConfiguration(classes = AutomationConfigurationRestTestConfiguration.class)
@WebMvcTest(ComponentDefinitionApiController.class)
@AutomationConfigurationRestConfigurationSharedMocks
public class ComponentDefinitionApiControllerIntTest {

    @Autowired
    private ComponentDefinitionService componentDefinitionService;

    @Autowired
    private MockMvc mockMvc;

    private WebTestClient webTestClient;

    @BeforeEach
    public void setup() {
        this.webTestClient = MockMvcWebTestClient.bindTo(mockMvc)
            .build();
    }

    @Test
    public void testGetComponentDefinitions() {
        Mockito.when(componentDefinitionService.getComponentDefinitions(null, null, null, null, ModeType.AUTOMATION))
            .thenReturn(List.of(new ComponentDefinition("component1"), new ComponentDefinition("component2")));

        try {
            webTestClient
                .get()
                .uri("/internal/core/component-definitions")
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody()
                .json(
                    """
                        [
                            {
                                "name":"component1"
                            },
                            {
                                "name":"component2"
                            }
                        ]
                        """);
        } catch (Exception exception) {
            Assertions.fail(exception);
        }
    }
}

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

package com.bytechef.platform.component.config;

import com.bytechef.atlas.configuration.service.WorkflowService;
import com.bytechef.message.broker.MessageBroker;
import com.bytechef.platform.configuration.facade.ComponentConnectionFacade;
import com.bytechef.platform.configuration.service.WorkflowTestConfigurationService;
import com.bytechef.platform.data.storage.DataStorage;
import com.bytechef.platform.oauth2.service.OAuth2Service;
import com.bytechef.platform.tag.service.TagService;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

/**
 * @author Ivica Cardic
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@MockitoBean(types = {
    DataStorage.class, MessageBroker.class, OAuth2Service.class, TagService.class, WorkflowService.class,
    ComponentConnectionFacade.class, WorkflowTestConfigurationService.class,
})
public @interface ComponentRegistryConfigurationSharedMocks {
}

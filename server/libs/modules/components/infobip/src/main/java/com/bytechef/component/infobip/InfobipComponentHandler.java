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

package com.bytechef.component.infobip;

import static com.bytechef.component.definition.ComponentDsl.component;

import com.bytechef.component.ComponentHandler;
import com.bytechef.component.definition.ComponentCategory;
import com.bytechef.component.definition.ComponentDefinition;
import com.bytechef.component.infobip.action.InfobipSendSMSAction;
import com.bytechef.component.infobip.action.InfobipSendWhatsAppTemplateMessageAction;
import com.bytechef.component.infobip.action.InfobipSendWhatsappTextMessageAction;
import com.bytechef.component.infobip.connection.InfobipConnection;
import com.bytechef.component.infobip.trigger.InfobipNewSMSTrigger;
import com.bytechef.component.infobip.trigger.InfobipNewWhatsAppMessageTrigger;
import com.google.auto.service.AutoService;

/**
 * @author Monika Kušter
 */
@AutoService(ComponentHandler.class)
public class InfobipComponentHandler implements ComponentHandler {

    private static final ComponentDefinition COMPONENT_DEFINITION = component("infobip")
        .title("Infobip")
        .description(
            "Infobip is a global communications platform that provide cloud-based messaging and omnichannel " +
                "communication solutions for businesses.")
        .customAction(true)
        .icon("path:assets/infobip.svg")
        .categories(ComponentCategory.COMMUNICATION)
        .connection(InfobipConnection.CONNECTION_DEFINITION)
        .actions(
            InfobipSendSMSAction.ACTION_DEFINITION,
            InfobipSendWhatsAppTemplateMessageAction.ACTION_DEFINITION,
            InfobipSendWhatsappTextMessageAction.ACTION_DEFINITION)
        .triggers(
            InfobipNewSMSTrigger.TRIGGER_DEFINITION,
            InfobipNewWhatsAppMessageTrigger.TRIGGER_DEFINITION);

    @Override
    public ComponentDefinition getDefinition() {
        return COMPONENT_DEFINITION;
    }
}

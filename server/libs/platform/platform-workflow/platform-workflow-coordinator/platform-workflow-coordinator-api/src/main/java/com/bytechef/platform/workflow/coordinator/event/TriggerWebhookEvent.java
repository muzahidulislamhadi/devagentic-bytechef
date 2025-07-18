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

package com.bytechef.platform.workflow.coordinator.event;

import com.bytechef.platform.component.trigger.WebhookRequest;
import com.bytechef.platform.workflow.coordinator.message.route.TriggerCoordinatorMessageRoute;
import com.bytechef.platform.workflow.execution.WorkflowExecutionId;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;

/**
 * @author Ivica Cardic
 */
public class TriggerWebhookEvent extends AbstractEvent {

    private WebhookParameters webhookParameters;

    private TriggerWebhookEvent() {
    }

    @SuppressFBWarnings("EI")
    public TriggerWebhookEvent(WebhookParameters webhookParameters) {
        super(TriggerCoordinatorMessageRoute.TRIGGER_WEBHOOK_EVENTS);

        this.webhookParameters = webhookParameters;
    }

    public WebhookParameters getWebhookParameters() {
        return webhookParameters;
    }

    public WebhookRequest getWebhookRequest() {
        return webhookParameters.webhookRequest;
    }

    public WorkflowExecutionId getWorkflowExecutionId() {
        return webhookParameters.workflowExecutionId;
    }

    @Override
    public String toString() {
        return "TriggerWebhookEvent{" +
            "webhookParameters=" + webhookParameters +
            ", createdDate=" + createDate +
            ", route=" + route +
            "} ";
    }

    public record WebhookParameters(WorkflowExecutionId workflowExecutionId, WebhookRequest webhookRequest) {
    }
}

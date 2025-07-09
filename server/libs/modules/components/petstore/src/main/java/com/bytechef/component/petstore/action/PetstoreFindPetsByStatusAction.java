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

package com.bytechef.component.petstore.action;

import static com.bytechef.component.OpenApiComponentHandler.PropertyType;
import static com.bytechef.component.definition.ComponentDsl.action;
import static com.bytechef.component.definition.ComponentDsl.array;
import static com.bytechef.component.definition.ComponentDsl.object;
import static com.bytechef.component.definition.ComponentDsl.option;
import static com.bytechef.component.definition.ComponentDsl.outputSchema;
import static com.bytechef.component.definition.ComponentDsl.string;
import static com.bytechef.component.definition.Context.Http.ResponseType;

import com.bytechef.component.definition.ComponentDsl;
import com.bytechef.component.petstore.property.PetstorePetProperties;
import java.util.Map;

/**
 * Provides a list of the component actions.
 *
 * @generated
 */
public class PetstoreFindPetsByStatusAction {
    public static final ComponentDsl.ModifiableActionDefinition ACTION_DEFINITION = action("findPetsByStatus")
        .title("Finds Pets by status")
        .description("Multiple status values can be provided with comma separated strings")
        .metadata(
            Map.of(
                "method", "GET",
                "path", "/pet/findByStatus"

            ))
        .properties(string("status").label("Status")
            .description("Status values that need to be considered for filter")
            .options(option("Available", "available"), option("Pending", "pending"), option("Sold", "sold"))
            .defaultValue("available")
            .required(false)
            .metadata(
                Map.of(
                    "type", PropertyType.QUERY)))
        .output(outputSchema(array().items(object().properties(PetstorePetProperties.PROPERTIES))
            .metadata(
                Map.of(
                    "responseType", ResponseType.JSON))));

    private PetstoreFindPetsByStatusAction() {
    }
}

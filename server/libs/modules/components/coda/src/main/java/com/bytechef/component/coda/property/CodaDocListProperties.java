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

package com.bytechef.component.coda.property;

import static com.bytechef.component.definition.ComponentDsl.array;
import static com.bytechef.component.definition.ComponentDsl.object;
import static com.bytechef.component.definition.ComponentDsl.string;

import com.bytechef.component.definition.ComponentDsl;
import java.util.List;

/**
 * Provides properties definition built from OpenAPI schema.
 *
 * @generated
 */
public class CodaDocListProperties {
    public static final List<ComponentDsl.ModifiableValueProperty<?, ?>> PROPERTIES = List.of(
        array("items").items(object().properties(CodaDocProperties.PROPERTIES)
            .description("Metadata about a Coda doc."))
            .placeholder("Add to Items")
            .label("Items")
            .required(false),
        string("href").label("Href")
            .description("API link to these results.")
            .required(false));

    private CodaDocListProperties() {
    }
}

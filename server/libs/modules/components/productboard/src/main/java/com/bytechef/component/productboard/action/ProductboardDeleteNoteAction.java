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

package com.bytechef.component.productboard.action;

import static com.bytechef.component.OpenApiComponentHandler.PropertyType;
import static com.bytechef.component.definition.ComponentDsl.action;
import static com.bytechef.component.definition.ComponentDsl.integer;
import static com.bytechef.component.definition.ComponentDsl.string;

import com.bytechef.component.definition.ComponentDsl;
import com.bytechef.component.definition.OptionsDataSource;
import com.bytechef.component.productboard.util.ProductboardUtils;
import java.util.Map;

/**
 * Provides a list of the component actions.
 *
 * @generated
 */
public class ProductboardDeleteNoteAction {
    public static final ComponentDsl.ModifiableActionDefinition ACTION_DEFINITION = action("deleteNote")
        .title("Delete Note")
        .description("Deletes a note.")
        .metadata(
            Map.of(
                "method", "DELETE",
                "path", "/notes/{noteId}"

            ))
        .properties(integer("X-Version").label("X - Version")
            .defaultValue(1)
            .required(true)
            .metadata(
                Map.of(
                    "type", PropertyType.HEADER)),
            string("noteId").label("Note ID")
                .description("ID of the note")
                .required(true)
                .options((OptionsDataSource.ActionOptionsFunction<String>) ProductboardUtils::getNoteIdOptions)
                .metadata(
                    Map.of(
                        "type", PropertyType.PATH)));

    private ProductboardDeleteNoteAction() {
    }
}

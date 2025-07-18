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

package com.bytechef.platform.configuration.domain;

/**
 * Enum for ordering MCP servers.
 *
 * @author Ivica Cardic
 */
public enum McpServerOrderBy {
    NAME_ASC,
    NAME_DESC,
    CREATED_DATE_ASC,
    CREATED_DATE_DESC,
    LAST_MODIFIED_DATE_ASC,
    LAST_MODIFIED_DATE_DESC
}

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

import com.bytechef.platform.connection.domain.Connection;
import java.time.Instant;
import java.util.Objects;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * Domain class representing an MCP component.
 *
 * @author Ivica Cardic
 */
@Table
public final class McpComponent {

    @Id
    private Long id;

    @Column("mcp_server_id")
    private AggregateReference<McpServer, Long> mcpServerId;

    @Column("connection_id")
    private AggregateReference<Connection, Long> connectionId;

    @Column("component_name")
    private String componentName;

    @Column("component_version")
    private int componentVersion;

    @CreatedBy
    @Column("created_by")
    private String createdBy;

    @Column("created_date")
    @CreatedDate
    private Instant createdDate;

    @Column("last_modified_by")
    @LastModifiedBy
    private String lastModifiedBy;

    @Column("last_modified_date")
    @LastModifiedDate
    private Instant lastModifiedDate;

    @Version
    private int version;

    public McpComponent() {
    }

    public McpComponent(String componentName, int componentVersion, Long mcpServerId, Long connectionId) {
        this.componentName = componentName;
        this.componentVersion = componentVersion;
        this.mcpServerId = AggregateReference.to(mcpServerId);
        this.connectionId = connectionId == null ? null : AggregateReference.to(connectionId);
    }

    public McpComponent(String componentName, int componentVersion, Long mcpServerId, Long connectionId, int version) {
        this.componentName = componentName;
        this.componentVersion = componentVersion;
        this.mcpServerId = AggregateReference.to(mcpServerId);
        this.connectionId = connectionId == null ? null : AggregateReference.to(connectionId);
        this.version = version;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Long getId() {
        return id;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public String getComponentName() {
        return componentName;
    }

    public int getComponentVersion() {
        return componentVersion;
    }

    public Long getMcpServerId() {
        return mcpServerId.getId();
    }

    public Long getConnectionId() {
        return connectionId != null ? connectionId.getId() : null;
    }

    public int getVersion() {
        return version;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        McpComponent mcpComponent = (McpComponent) o;

        return Objects.equals(id, mcpComponent.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public void setComponentName(String componentName) {
        this.componentName = componentName;
    }

    public void setComponentVersion(int componentVersion) {
        this.componentVersion = componentVersion;
    }

    public void setMcpServerId(Long mcpServerId) {
        this.mcpServerId = AggregateReference.to(mcpServerId);
    }

    public void setConnectionId(Long connectionId) {
        this.connectionId = connectionId == null ? null : AggregateReference.to(connectionId);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    @Override
    public String toString() {
        return "McpComponent{" +
            "id=" + id +
            ", componentName='" + componentName + '\'' +
            ", componentVersion='" + componentVersion + '\'' +
            ", mcpServerId=" + mcpServerId +
            ", connectionId=" + connectionId +
            ", version=" + version +
            ", createdBy='" + createdBy + '\'' +
            ", createdDate=" + createdDate +
            ", lastModifiedBy='" + lastModifiedBy + '\'' +
            ", lastModifiedDate=" + lastModifiedDate +
            '}';
    }
}

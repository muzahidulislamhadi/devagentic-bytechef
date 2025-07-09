/*
 * Copyright 2025 ByteChef
 *
 * Licensed under the ByteChef Enterprise license (the "Enterprise License");
 * you may not use this file except in compliance with the Enterprise License.
 */

package com.bytechef.ee.automation.apiplatform.configuration.domain;

import com.bytechef.automation.configuration.domain.ProjectDeploymentWorkflow;
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
 * @version ee
 *
 * @author Ivica Cardic
 */
@Table("api_collection_endpoint")
public class ApiCollectionEndpoint {

    public enum HttpMethod {
        DELETE, GET, PATCH, POST, PUT
    }

    @Column("api_collection_id")
    private AggregateReference<ApiCollection, Long> apiCollectionId;

    @CreatedBy
    @Column("created_by")
    private String createdBy;

    @Column("created_date")
    @CreatedDate
    private Instant createdDate;

    @Column("http_method")
    private int httpMethod;

    @Id
    private Long id;

    @Column("last_modified_by")
    @LastModifiedBy
    private String lastModifiedBy;

    @Column("last_modified_date")
    @LastModifiedDate
    private Instant lastModifiedDate;

    @Column
    private String name;

    @Column
    private String path;

    @Column("project_deployment_workflow_id")
    private AggregateReference<ProjectDeploymentWorkflow, Long> projectDeploymentWorkflowId;

    @Version
    private int version;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (!(o instanceof ApiCollectionEndpoint openApiConnector)) {
            return false;
        }

        return Objects.equals(id, openApiConnector.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public Long getApiCollectionId() {
        return apiCollectionId.getId();
    }

    public Long getId() {
        return id;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public HttpMethod getHttpMethod() {
        return HttpMethod.values()[httpMethod];
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public String getName() {
        return name;
    }

    public String getPath() {
        return path;
    }

    public Long getProjectDeploymentWorkflowId() {
        return projectDeploymentWorkflowId.getId();
    }

    public int getVersion() {
        return version;
    }

    public void setApiCollectionId(Long apiCollectionId) {
        this.apiCollectionId = AggregateReference.to(apiCollectionId);
    }

    public void setHttpMethod(HttpMethod httpMethod) {
        this.httpMethod = httpMethod.ordinal();
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public void setProjectDeploymentWorkflowId(Long projectDeploymentWorkflowId) {
        this.projectDeploymentWorkflowId = AggregateReference.to(projectDeploymentWorkflowId);
    }

    public void setVersion(int version) {
        this.version = version;
    }

    @Override
    public String toString() {
        return "ApiCollectionEndpoint{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", path='" + path + '\'' +
            ", httpMethod='" + httpMethod + '\'' +
            ", projectDeploymentWorkflowId=" + projectDeploymentWorkflowId +
            ", createdBy='" + createdBy + '\'' +
            ", createdDate=" + createdDate +
            ", lastModifiedBy='" + lastModifiedBy + '\'' +
            ", lastModifiedDate=" + lastModifiedDate +
            ", version=" + version +
            '}';
    }
}

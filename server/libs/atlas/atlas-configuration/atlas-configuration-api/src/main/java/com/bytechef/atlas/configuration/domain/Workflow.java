/*
 * Copyright 2016-2020 the original author or authors.
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
 *
 * Modifications copyright (C) 2025 ByteChef
 */

package com.bytechef.atlas.configuration.domain;

import com.bytechef.atlas.configuration.constant.WorkflowConstants;
import com.bytechef.atlas.configuration.util.WorkflowTaskUtils;
import com.bytechef.atlas.configuration.workflow.mapper.WorkflowReader;
import com.bytechef.atlas.configuration.workflow.mapper.WorkflowResource;
import com.bytechef.commons.util.CollectionUtils;
import com.bytechef.commons.util.MapUtils;
import java.io.Serializable;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.annotation.Transient;
import org.springframework.data.annotation.Version;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.util.Assert;

/**
 * Workflows are the blueprints that describe the execution of a job.
 *
 * @author Arik Cohen
 * @author Ivica Cardic
 */
@Table
public final class Workflow implements Persistable<String>, Serializable {

    public enum Format {

        JSON, YAML;

        public static Format parse(String filename) {
            Assert.notNull(filename, "Filename '%s' can not be null".formatted(filename));

            String extension = Optional.of(filename)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(filename.lastIndexOf(".") + 1))
                .orElse("");

            return Objects.equals(extension.toLowerCase(), "json") ? JSON : YAML;
        }
    }

    public enum SourceType {
        CLASSPATH, FILESYSTEM, GIT, JDBC
    }

    @CreatedBy
    @Column("created_by")
    private String createdBy;

    @Column("created_date")
    @CreatedDate
    private Instant createdDate;

    @Column
    private String definition;

    @Transient
    private String description;

    @Transient
    private final Map<String, Object> extensions = new HashMap<>();

    @Column
    private int format;

    @Id
    private String id;

    @Transient
    private List<Input> inputs = Collections.emptyList();

    @Transient
    private boolean isNew;

    @Transient
    private String label;

    @Column("last_modified_by")
    @LastModifiedBy
    private String lastModifiedBy;

    @Column("last_modified_date")
    @LastModifiedDate
    private Instant lastModifiedDate;

    @Transient
    private Map<String, Object> metadata = new HashMap<>();

    @Transient
    private List<Output> outputs = Collections.emptyList();

    @Transient
    private SourceType sourceType;

    @Transient
    private int maxRetries;

    @Transient
    private List<WorkflowTask> tasks = Collections.emptyList();

    @Version
    private int version;

    public Workflow(String definition, Format format) {
        this(null, definition, format, null, Map.of());
    }

    public Workflow(String id, String definition, Format format) {
        this(id, definition, format, null, Map.of());
    }

    @SuppressWarnings("unchecked")
    public Workflow(
        String id, String definition, Format format, Instant lastModifiedDate, Map<String, Object> metadata) {

        Assert.notNull(definition, "'definition' must not be null");
        Assert.notNull(format, "'format' must not be null");
        Assert.notNull(metadata, "'metadata' must not be null");

        this.definition = definition;
        this.format = format.ordinal();
        this.id = id;
        this.lastModifiedDate = lastModifiedDate;
        this.metadata = new HashMap<>(metadata);

        Map<String, ?> sourceMap = readWorkflowMap(definition, id, format);

        for (Map.Entry<String, ?> entry : sourceMap.entrySet()) {
            if (WorkflowConstants.DESCRIPTION.equals(entry.getKey())) {
                this.description = MapUtils.getString(sourceMap, WorkflowConstants.DESCRIPTION);
            } else if (WorkflowConstants.INPUTS.equals(entry.getKey())) {
                this.inputs = CollectionUtils.map(
                    MapUtils.getList(sourceMap, WorkflowConstants.INPUTS, Map.class, Collections.emptyList()),
                    map -> new Input(
                        MapUtils.getRequiredString(map, WorkflowConstants.NAME),
                        MapUtils.getString(map, WorkflowConstants.LABEL),
                        MapUtils.getString(map, WorkflowConstants.TYPE, "string"),
                        MapUtils.getBoolean(map, WorkflowConstants.REQUIRED, false)));
            } else if (WorkflowConstants.LABEL.equals(entry.getKey())) {
                this.label = MapUtils.getString(sourceMap, WorkflowConstants.LABEL);
            } else if (WorkflowConstants.OUTPUTS.equals(entry.getKey())) {
                this.outputs = CollectionUtils.map(
                    MapUtils.getList(sourceMap, WorkflowConstants.OUTPUTS, Map.class, List.of()),
                    map -> new Output(
                        MapUtils.getRequiredString(map, WorkflowConstants.NAME),
                        MapUtils.getRequiredString(map, WorkflowConstants.VALUE)));
            } else if (WorkflowConstants.MAX_RETRIES.equals(entry.getKey())) {
                this.maxRetries = MapUtils.getInteger(sourceMap, WorkflowConstants.MAX_RETRIES, 0);
            } else if (WorkflowConstants.TASKS.equals(entry.getKey())) {
                // Keep null value in parameters map
                List<Map<String, ?>> tasks = (List<Map<String, ?>>) MapUtils.get(sourceMap, WorkflowConstants.TASKS);

                if (tasks == null) {
                    tasks = List.of();
                }

                this.tasks = CollectionUtils.map(tasks, WorkflowTask::new);
            } else {
                extensions.put(entry.getKey(), entry.getValue());
            }
        }
    }

    @PersistenceCreator
    public Workflow(String id, String definition, Format format, Instant lastModifiedDate) throws Exception {
        this(id, definition, format, lastModifiedDate, Map.of());
    }

    private Workflow() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Workflow workflow = (Workflow) o;

        return Objects.equals(id, workflow.id);
    }

    public <T> T getExtension(String name, Class<T> elementType, T defaultValue) {
        return MapUtils.get(extensions, name, elementType, defaultValue);
    }

    public Map<String, Object> getExtensions() {
        return Collections.unmodifiableMap(extensions);
    }

    public <T> List<T> getExtensions(String name, Class<T> elementType, List<T> defaultValue) {
        return MapUtils.getList(extensions, name, elementType, defaultValue);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public String getDefinition() {
        return definition;
    }

    public String getDescription() {
        return description;
    }

    public Format getFormat() {
        return Format.values()[format];
    }

    /** Returns the unique identifier of the workflow. */
    public String getId() {
        return id;
    }

    /** Returns the workflow's expected inputs */
    public List<Input> getInputs() {
        return Collections.unmodifiableList(inputs);
    }

    /** Returns a descriptive name for the workflow. */
    public String getLabel() {
        return label;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public Map<String, Object> getMetadata() {
        return Collections.unmodifiableMap(metadata);
    }

    public Object getMetadata(String key) {
        return metadata.get(key);
    }

    /** Returns the workflow's expected outputs */
    public List<Output> getOutputs() {
        return Collections.unmodifiableList(outputs);
    }

    public SourceType getSourceType() {
        return sourceType;
    }

    /**
     * Defines the maximum number of times a task may retry.
     *
     * @return int the maximum number of retries.
     */
    public int getMaxRetries() {
        return maxRetries;
    }

    public WorkflowTask getTask(String workflowNodeName) {
        for (WorkflowTask workflowTask : WorkflowTaskUtils.getTasks(tasks, null)) {
            if (Objects.equals(workflowTask.getName(), workflowNodeName)) {
                return workflowTask;
            }
        }

        throw new IllegalArgumentException("Workflow task with name: %s does not exist".formatted(workflowNodeName));
    }

    /** Returns the steps that make up the workflow. */
    public List<WorkflowTask> getTasks() {
        return getTasks(false);
    }

    public List<WorkflowTask> getTasks(boolean flatten) {
        if (flatten) {
            return WorkflowTaskUtils.getTasks(tasks, null);
        }

        return Collections.unmodifiableList(tasks);
    }

    public List<WorkflowTask> getTasks(String lastWorkflowNodeName) {
        return WorkflowTaskUtils.getTasks(tasks, lastWorkflowNodeName);
    }

    public int getVersion() {
        return version;
    }

    @Override
    public boolean isNew() {
        return isNew;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setDefinition(String definition) {

        // Validate

        try {
            readWorkflowMap(definition, id, Format.values()[format]);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        this.definition = definition;
    }

    public void setNew(boolean isNew) {
        this.isNew = isNew;
    }

    public void setSourceType(SourceType sourceType) {
        this.sourceType = sourceType;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    @Override
    public String toString() {
        return "Workflow{" +
            "id=" + id +
            ", label='" + label + '\'' +
            ", definition='" + definition + '\'' +
            ", format=" + format +
            ", sourceType=" + sourceType +
            ", inputs=" + inputs +
            ", outputs=" + outputs +
            ", maxRetries=" + maxRetries +
            ", tasks=" + tasks +
            ", version=" + version +
            ", createdBy='" + createdBy + '\'' +
            ", createdDate=" + createdDate +
            ", lastModifiedBy='" + lastModifiedBy + '\'' +
            ", lastModifiedDate=" + lastModifiedDate +
            '}';
    }

    private static Map<String, ?> readWorkflowMap(String definition, String id, Format format) {
        try {
            return WorkflowReader.readWorkflowMap(
                new WorkflowResource(
                    id, Map.of(), new ByteArrayResource(definition.getBytes(StandardCharsets.UTF_8)), format));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public record Input(String name, String label, String type, boolean required)
        implements Serializable {

    }

    public record Output(String name, Object value) implements Serializable {

    }
}

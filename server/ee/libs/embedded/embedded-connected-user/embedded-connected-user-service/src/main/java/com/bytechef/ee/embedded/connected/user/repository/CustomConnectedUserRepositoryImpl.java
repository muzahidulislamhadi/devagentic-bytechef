/*
 * Copyright 2025 ByteChef
 *
 * Licensed under the ByteChef Enterprise license (the "Enterprise License");
 * you may not use this file except in compliance with the Enterprise License.
 */

package com.bytechef.ee.embedded.connected.user.repository;

import com.bytechef.ee.embedded.connected.user.domain.ConnectedUser;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

/**
 * @version ee
 *
 * @author Ivica Cardic
 */
@Repository
public class CustomConnectedUserRepositoryImpl implements CustomConnectedUserRepository {

    private final JdbcClient jdbcClient;

    @SuppressFBWarnings("EI")
    public CustomConnectedUserRepositoryImpl(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    @Override
    public Page<ConnectedUser> findAll(
        Integer environment, String search, LocalDate createDateFrom, LocalDate createDateTo, Long integrationId,
        Pageable pageable) {

        Page<ConnectedUser> page;
        JdbcClient.StatementSpec statementSpec = buildQuery(
            environment, search, createDateFrom, createDateTo, integrationId, pageable, true);

        long total = statementSpec.query(Long.class)
            .single();

        if (total == 0) {
            page = Page.empty();
        } else {
            statementSpec =
                buildQuery(environment, search, createDateFrom, createDateTo, integrationId, pageable, false);

            List<ConnectedUser> connectedUsers = statementSpec
                .query(ConnectedUser.class)
                .list();

            for (ConnectedUser connectedUser : connectedUsers) {
                connectedUser.setMetadata(
                    jdbcClient
                        .sql(
                            "SELECT connected_user_metadata.key, connected_user_metadata.value FROM connected_user_metadata WHERE connected_user_id = ?")
                        .param(connectedUser.getId())
                        .query(ConnectedUserMetadata.class)
                        .list()
                        .stream()
                        .collect(
                            Collectors.toMap(
                                connectedUserMetadata -> connectedUserMetadata.key,
                                connectedUserMetadata -> connectedUserMetadata.value)));
            }

            page = new PageImpl<>(connectedUsers, pageable, total);
        }

        return page;
    }

    private JdbcClient.StatementSpec buildQuery(
        Integer environment, String search, LocalDate createDateFrom, LocalDate createDateTo, Long integrationId,
        Pageable pageable,
        boolean countQuery) {

        String query;

        if (countQuery) {
            query = "SELECT COUNT(connected_user.id) FROM connected_user ";
        } else {
            query = "SELECT connected_user.* FROM connected_user ";
        }

        if (integrationId != null) {
            query +=
                """
                        JOIN integration_instance ON integration_instance.connected_user_id = connected_user.id
                        JOIN integration_instance_configuration ON integration_instance_configuration.id = integration_instance.integration_instance_configuration_id
                    """;
        }

        if (environment != null || search != null || createDateFrom != null || createDateTo != null ||
            integrationId != null) {

            query += "WHERE ";
        }

        List<Object> arguments = new ArrayList<>();

        if (environment != null) {
            query += "environment = ? ";

            arguments.add(environment);
        }

        if (search != null) {
            if (environment != null) {
                query += "AND ";
            }

            query += "name LIKE ? or email LIKE ? or external_id LIKE ? ";

            arguments.addAll(List.of("%" + search + "%", "%" + search + "%", "%" + search + "%"));
        }

        if (createDateFrom != null) {
            if (environment != null || search != null) {
                query += "AND ";
            }

            query += "created_date >= ? ";

            arguments.add(createDateFrom);
        }

        if (createDateTo != null) {
            if (environment != null || search != null || createDateFrom != null) {
                query += "AND ";
            }

            query += "created_date <= ? ";

            arguments.add(createDateTo);
        }

        if (integrationId != null) {
            if (environment != null || search != null || createDateFrom != null || createDateTo != null) {
                query += "AND ";
            }

            query += "integration_instance_configuration.integration_id = ? ";

            arguments.add(integrationId);
        }

        if (!countQuery && pageable != null) {
            query += "LIMIT %s OFFSET %s".formatted(pageable.getPageSize(), pageable.getOffset());
        }

        return jdbcClient
            .sql(query)
            .params(arguments);
    }

    private record ConnectedUserMetadata(String key, String value) {
    }
}

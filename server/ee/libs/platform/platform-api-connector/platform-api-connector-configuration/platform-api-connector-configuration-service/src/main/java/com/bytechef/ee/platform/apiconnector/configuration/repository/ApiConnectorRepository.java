/*
 * Copyright 2025 ByteChef
 *
 * Licensed under the ByteChef Enterprise license (the "Enterprise License");
 * you may not use this file except in compliance with the Enterprise License.
 */

package com.bytechef.ee.platform.apiconnector.configuration.repository;

import com.bytechef.ee.platform.apiconnector.configuration.domain.ApiConnector;
import com.bytechef.platform.annotation.ConditionalOnEEVersion;
import java.util.Optional;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.ListPagingAndSortingRepository;
import org.springframework.stereotype.Repository;

/**
 * @version ee
 *
 * @author Ivica Cardic
 */
@Repository
@ConditionalOnEEVersion
public interface ApiConnectorRepository
    extends ListPagingAndSortingRepository<ApiConnector, Long>, ListCrudRepository<ApiConnector, Long> {

    Optional<ApiConnector> findByNameAndConnectorVersion(String name, int connectorVersion);
}

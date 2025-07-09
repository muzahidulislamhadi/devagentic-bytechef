/*
 * Copyright 2025 ByteChef
 *
 * Licensed under the ByteChef Enterprise license (the "Enterprise License");
 * you may not use this file except in compliance with the Enterprise License.
 */

package com.bytechef.ee.remote.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

/**
 * @version ee
 *
 * @author Ivica Cardic
 */
@Component
public class LoadBalancedRestClient extends AbstractRestClient {

    public LoadBalancedRestClient(RestClient.Builder loadBalancedRestClientBuilder) {
        super(loadBalancedRestClientBuilder);
    }
}

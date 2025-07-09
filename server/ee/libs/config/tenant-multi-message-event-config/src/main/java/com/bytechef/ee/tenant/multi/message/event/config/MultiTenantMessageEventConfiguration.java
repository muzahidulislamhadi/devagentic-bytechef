/*
 * Copyright 2025 ByteChef
 *
 * Licensed under the ByteChef Enterprise license (the "Enterprise License");
 * you may not use this file except in compliance with the Enterprise License.
 */

package com.bytechef.ee.tenant.multi.message.event.config;

import com.bytechef.message.event.MessageEventPostReceiveProcessor;
import com.bytechef.message.event.MessageEventPreSendProcessor;
import com.bytechef.platform.annotation.ConditionalOnEEVersion;
import com.bytechef.tenant.TenantContext;
import com.bytechef.tenant.annotation.ConditionalOnMultiTenant;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @version ee
 *
 * @author Ivica Cardic
 */
@Configuration
@ConditionalOnEEVersion
@ConditionalOnMultiTenant
public class MultiTenantMessageEventConfiguration {

    private static final String CURRENT_TENANT_ID = "CURRENT_TENANT_ID";

    @Bean
    MessageEventPreSendProcessor messagePreSendProcessor() {
        return messageEvent -> {
            messageEvent.putMetadata(CURRENT_TENANT_ID, TenantContext.getCurrentTenantId());

            return messageEvent;
        };
    }

    @Bean
    MessageEventPostReceiveProcessor messagePostReceiveProcessor() {
        return messageEvent -> {
            TenantContext.setCurrentTenantId((String) messageEvent.getMetadata(CURRENT_TENANT_ID));

            return messageEvent;
        };
    }
}

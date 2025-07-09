/*
 * Copyright 2025 ByteChef
 *
 * Licensed under the ByteChef Enterprise license (the "Enterprise License");
 * you may not use this file except in compliance with the Enterprise License.
 */

package com.bytechef.webhook;

import com.bytechef.AbstractApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @version ee
 *
 * @author Ivica Cardic
 */
@SpringBootApplication(scanBasePackages = "com.bytechef")
public class WebhookApplication extends AbstractApplication {

    /**
     * Main method, used to run the application.
     *
     * @param args the command line arguments.
     */
    public static void main(String[] args) {
        SpringApplication.run(WebhookApplication.class, args);
    }
}

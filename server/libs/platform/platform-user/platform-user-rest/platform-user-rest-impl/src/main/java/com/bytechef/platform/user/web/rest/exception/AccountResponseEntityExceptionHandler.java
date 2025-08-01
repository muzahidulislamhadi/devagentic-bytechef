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

package com.bytechef.platform.user.web.rest.exception;

import com.bytechef.web.rest.error.AbstractResponseEntityExceptionHandler;
import edu.umd.cs.findbugs.annotations.SuppressFBWarnings;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

/**
 * @author Ivica Cardic
 */
@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class AccountResponseEntityExceptionHandler extends AbstractResponseEntityExceptionHandler {

    @ExceptionHandler(AccountResourceException.class)
    @SuppressFBWarnings("BC_UNCONFIRMED_CAST")
    public ResponseEntity<Object> handleAccountResourceException(
        final AccountResourceException exception, final WebRequest request) {

        return ResponseEntity
            .status(exception.getStatus())
            .body(createProblemDetail(exception, exception.getStatus(), null, request));
    }
}

package com.bytechef.ee.embedded.configuration.public_.web.rest.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonValue;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import jakarta.annotation.Generated;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * The environment of a project.
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-06-24T21:36:46.689421+02:00[Europe/Zagreb]", comments = "Generator version: 7.13.0")
public enum EnvironmentModel {
  
  DEVELOPMENT("DEVELOPMENT"),
  
  STAGING("STAGING"),
  
  PRODUCTION("PRODUCTION");

  private final String value;

  EnvironmentModel(String value) {
    this.value = value;
  }

  @JsonValue
  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  @JsonCreator
  public static EnvironmentModel fromValue(String value) {
    for (EnvironmentModel b : EnvironmentModel.values()) {
      if (b.value.equalsIgnoreCase(value)) {
        return b;
      }
    }
    throw new IllegalArgumentException("Unexpected value '" + value + "'");
  }
}


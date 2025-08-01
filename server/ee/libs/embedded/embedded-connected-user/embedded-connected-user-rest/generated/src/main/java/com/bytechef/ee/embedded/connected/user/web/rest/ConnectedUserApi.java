/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech) (7.13.0).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
package com.bytechef.ee.embedded.connected.user.web.rest;

import com.bytechef.ee.embedded.connected.user.web.rest.model.ConnectedUserModel;
import com.bytechef.ee.embedded.connected.user.web.rest.model.CredentialStatusModel;
import org.springframework.format.annotation.DateTimeFormat;
import com.bytechef.ee.embedded.connected.user.web.rest.model.EnvironmentModel;
import java.time.LocalDate;
import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import jakarta.annotation.Generated;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-06-24T11:56:41.561215+02:00[Europe/Zagreb]", comments = "Generator version: 7.13.0")
@Validated
@Tag(name = "connected-user", description = "The Embedded Connected User Internal API")
public interface ConnectedUserApi {

    default Optional<NativeWebRequest> getRequest() {
        return Optional.empty();
    }

    /**
     * DELETE /connected-users/{id} : Delete a connected user
     * Delete a connected user.
     *
     * @param id The id of an integration instance configuration. (required)
     * @return Successful operation. (status code 204)
     */
    @Operation(
        operationId = "deleteConnectedUser",
        summary = "Delete a connected user",
        description = "Delete a connected user.",
        tags = { "connected-user" },
        responses = {
            @ApiResponse(responseCode = "204", description = "Successful operation.")
        }
    )
    @RequestMapping(
        method = RequestMethod.DELETE,
        value = "/connected-users/{id}"
    )
    
    default ResponseEntity<Void> deleteConnectedUser(
        @Parameter(name = "id", description = "The id of an integration instance configuration.", required = true, in = ParameterIn.PATH) @PathVariable("id") Long id
    ) {
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }


    /**
     * PATCH /connected-users/{id}/enable/{enable} : Enable/disable a connected user
     * Enable/disable a connected user.
     *
     * @param id The id of a connected user. (required)
     * @param enable Enable/disable the connected user. (required)
     * @return Successful operation. (status code 204)
     */
    @Operation(
        operationId = "enableConnectedUser",
        summary = "Enable/disable a connected user",
        description = "Enable/disable a connected user.",
        tags = { "connected-user" },
        responses = {
            @ApiResponse(responseCode = "204", description = "Successful operation.")
        }
    )
    @RequestMapping(
        method = RequestMethod.PATCH,
        value = "/connected-users/{id}/enable/{enable}"
    )
    
    default ResponseEntity<Void> enableConnectedUser(
        @Parameter(name = "id", description = "The id of a connected user.", required = true, in = ParameterIn.PATH) @PathVariable("id") Long id,
        @Parameter(name = "enable", description = "Enable/disable the connected user.", required = true, in = ParameterIn.PATH) @PathVariable("enable") Boolean enable
    ) {
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }


    /**
     * GET /connected-users/{id} : Get a connected user
     * Get a connected user.
     *
     * @param id The id of an integration instance. (required)
     * @return A connection object. (status code 200)
     */
    @Operation(
        operationId = "getConnectedUser",
        summary = "Get a connected user",
        description = "Get a connected user.",
        tags = { "connected-user" },
        responses = {
            @ApiResponse(responseCode = "200", description = "A connection object.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = ConnectedUserModel.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/connected-users/{id}",
        produces = { "application/json" }
    )
    
    default ResponseEntity<ConnectedUserModel> getConnectedUser(
        @Parameter(name = "id", description = "The id of an integration instance.", required = true, in = ParameterIn.PATH) @PathVariable("id") Long id
    ) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"metadata\" : { \"key\" : \"\" }, \"lastModifiedDate\" : \"2000-01-23T04:56:07.000+00:00\", \"lastModifiedBy\" : \"lastModifiedBy\", \"externalId\" : \"externalId\", \"integrationInstances\" : [ { \"integrationInstanceConfigurationId\" : 5, \"integrationVersion\" : 5, \"integrationId\" : 1, \"connectionId\" : 2, \"componentName\" : \"componentName\", \"id\" : 6, \"enabled\" : true, \"credentialStatus\" : \"VALID\" }, { \"integrationInstanceConfigurationId\" : 5, \"integrationVersion\" : 5, \"integrationId\" : 1, \"connectionId\" : 2, \"componentName\" : \"componentName\", \"id\" : 6, \"enabled\" : true, \"credentialStatus\" : \"VALID\" } ], \"enabled\" : true, \"__version\" : 7, \"environment\" : \"DEVELOPMENT\", \"createdDate\" : \"2000-01-23T04:56:07.000+00:00\", \"createdBy\" : \"createdBy\", \"name\" : \"name\", \"id\" : 0, \"email\" : \"email\" }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }


    /**
     * GET /connected-users : Get all connected users
     * Get all connected users.
     *
     * @param environment The environment. (optional)
     * @param credentialStatus The id of an integration instance. (optional)
     * @param createDateFrom The start range of a create date. (optional)
     * @param createDateTo The end range of a create date . (optional)
     * @param integrationId The id of an integration. (optional)
     * @param pageNumber The number of the page to return. (optional, default to 0)
     * @param search The name, email or external reference code of a connected user. (optional)
     * @return The page of connected users. (status code 200)
     */
    @Operation(
        operationId = "getConnectedUsers",
        summary = "Get all connected users",
        description = "Get all connected users.",
        tags = { "connected-user" },
        responses = {
            @ApiResponse(responseCode = "200", description = "The page of connected users.", content = {
                @Content(mediaType = "application/json", schema = @Schema(implementation = org.springframework.data.domain.Page.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/connected-users",
        produces = { "application/json" }
    )
    
    default ResponseEntity<org.springframework.data.domain.Page> getConnectedUsers(
        @Parameter(name = "environment", description = "The environment.", in = ParameterIn.QUERY) @Valid @RequestParam(value = "environment", required = false) EnvironmentModel environment,
        @Parameter(name = "credentialStatus", description = "The id of an integration instance.", in = ParameterIn.QUERY) @Valid @RequestParam(value = "credentialStatus", required = false) CredentialStatusModel credentialStatus,
        @Parameter(name = "createDateFrom", description = "The start range of a create date.", in = ParameterIn.QUERY) @Valid @RequestParam(value = "createDateFrom", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate createDateFrom,
        @Parameter(name = "createDateTo", description = "The end range of a create date .", in = ParameterIn.QUERY) @Valid @RequestParam(value = "createDateTo", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate createDateTo,
        @Parameter(name = "integrationId", description = "The id of an integration.", in = ParameterIn.QUERY) @Valid @RequestParam(value = "integrationId", required = false) Long integrationId,
        @Parameter(name = "pageNumber", description = "The number of the page to return.", in = ParameterIn.QUERY) @Valid @RequestParam(value = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
        @Parameter(name = "search", description = "The name, email or external reference code of a connected user.", in = ParameterIn.QUERY) @Valid @RequestParam(value = "search", required = false) String search
    ) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"number\" : 0, \"size\" : 6, \"numberOfElements\" : 1, \"totalPages\" : 5, \"content\" : [ \"{}\", \"{}\" ], \"totalElements\" : 5 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

}

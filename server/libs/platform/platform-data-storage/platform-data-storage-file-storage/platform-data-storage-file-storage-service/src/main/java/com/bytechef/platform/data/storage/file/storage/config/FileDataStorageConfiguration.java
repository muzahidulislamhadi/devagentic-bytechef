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

package com.bytechef.platform.data.storage.file.storage.config;

import static com.bytechef.config.ApplicationProperties.DataStorage.Provider;

import com.bytechef.file.storage.FileStorageServiceRegistry;
import com.bytechef.platform.constant.ModeType;
import com.bytechef.platform.data.storage.DataStorage;
import com.bytechef.platform.data.storage.annotation.ConditionalOnDataStorageProviderAws;
import com.bytechef.platform.data.storage.annotation.ConditionalOnDataStorageProviderFilesystem;
import com.bytechef.platform.data.storage.domain.DataStorageScope;
import com.bytechef.platform.data.storage.file.storage.service.FileDataStorageService;
import com.bytechef.platform.data.storage.file.storage.service.FileDataStorageServiceImpl;
import java.util.Map;
import java.util.Optional;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;

/**
 * @author Ivica Cardic
 */
@Configuration
public class FileDataStorageConfiguration {

    @Bean
    @ConditionalOnDataStorageProviderAws
    DataStorage awsFileStorageDataStorageService(FileStorageServiceRegistry fileStorageServiceRegistry) {
        return new DataStorageImpl(
            new FileDataStorageServiceImpl(fileStorageServiceRegistry.getFileStorageService(Provider.AWS.name())));
    }

    @Bean
    @ConditionalOnDataStorageProviderFilesystem
    DataStorage filesystemFileStorageDataStorageService(FileStorageServiceRegistry fileStorageServiceRegistry) {
        return new DataStorageImpl(
            new FileDataStorageServiceImpl(
                fileStorageServiceRegistry.getFileStorageService(Provider.FILESYSTEM.name())));
    }

    private record DataStorageImpl(FileDataStorageService fileDataStorageService) implements DataStorage {

        @NonNull
        @Override
        public <T> Optional<T> fetch(
            @NonNull String componentName, @NonNull DataStorageScope scope, @NonNull String scopeId,
            @NonNull String key, @NonNull ModeType type) {

            return fileDataStorageService.fetch(componentName, scope, scopeId, key, type);
        }

        @NonNull
        @Override
        public <T> T get(
            @NonNull String componentName, @NonNull DataStorageScope scope, @NonNull String scopeId,
            @NonNull String key, @NonNull ModeType type) {

            return fileDataStorageService.get(componentName, scope, scopeId, key, type);
        }

        @NonNull
        @Override
        public <T> Map<String, T> getAll(
            @NonNull String componentName, @NonNull DataStorageScope scope, @NonNull String scopeId,
            @NonNull ModeType type) {

            return fileDataStorageService.getAll(componentName, scope, scopeId, type);
        }

        @Override
        public void put(
            @NonNull String componentName, @NonNull DataStorageScope scope, @NonNull String scopeId,
            @NonNull String key, @NonNull ModeType type, @NonNull Object value) {

            fileDataStorageService.put(componentName, scope, scopeId, key, type, value);
        }

        @Override
        public void delete(
            @NonNull String componentName, @NonNull DataStorageScope scope, @NonNull String scopeId,
            @NonNull String key, @NonNull ModeType type) {

            fileDataStorageService.delete(componentName, scope, scopeId, key, type);
        }
    }
}

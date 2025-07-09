dependencies {
    implementation("org.apache.commons:commons-lang3")
    implementation("jakarta.validation:jakarta.validation-api")
    implementation("org.springframework.boot:spring-boot-autoconfigure")
    implementation(project(":server:libs:core:commons:commons-util"))

    implementation(project(":server:ee:libs:embedded:embedded-configuration:embedded-configuration-api"))
    implementation(project(":server:ee:libs:embedded:embedded-connected-user:embedded-connected-user-api"))
}

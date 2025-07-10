# docker/dockerfile:1

# Stage 1: Build the client
FROM node:20-alpine AS client-builder

WORKDIR /app/client

# Copy client package files
COPY client/package*.json ./

# Install all dependencies with legacy peer deps to handle storybook conflicts
RUN npm install --legacy-peer-deps

# Copy client source code
COPY client/ ./

# Build the client (this will run tsc && vite build)
RUN npm run build

# Stage 2: Build the server
FROM gradle:8.14-jdk21-alpine AS server-builder

WORKDIR /build

# Copy all necessary source files for server build
COPY --chown=gradle:gradle ./.git ./.git
COPY --chown=gradle:gradle ./buildSrc ./buildSrc
COPY --chown=gradle:gradle ./gradle ./gradle
COPY --chown=gradle:gradle ./cli ./cli
COPY --chown=gradle:gradle ./sdks ./sdks
COPY --chown=gradle:gradle ./server ./server
COPY --chown=gradle:gradle ./build.gradle.kts ./build.gradle.kts
COPY --chown=gradle:gradle ./gradle.properties ./gradle.properties
COPY --chown=gradle:gradle ./settings.gradle.kts ./settings.gradle.kts

WORKDIR ./

# Build the server JAR with our authentication fixes
RUN gradle bootJar --no-daemon

# Stage 3: Final runtime image
FROM ghcr.io/graalvm/graalvm-community:21.0.2

# Set the application home directory
ARG ARG_APPLICATION_HOME=/opt/bytechef

# Create necessary directories
RUN mkdir -p ${ARG_APPLICATION_HOME}/client/assets
RUN mkdir -p ${ARG_APPLICATION_HOME}/server/tmp
RUN mkdir -p ${ARG_APPLICATION_HOME}/server/logs

WORKDIR ${ARG_APPLICATION_HOME}

# Copy the built server JAR from server-builder stage
COPY --from=server-builder /build/server/apps/server-app/build/libs/*app.jar server/server-app.jar

# Copy all built client files from client-builder stage
COPY --from=client-builder /app/client/dist/index.html client/
COPY --from=client-builder /app/client/dist/oauth.html client/
COPY --from=client-builder /app/client/dist/favicon.ico client/
COPY --from=client-builder /app/client/dist/mockServiceWorker.js client/
COPY --from=client-builder /app/client/dist/assets/ client/assets/

# Set proper permissions
RUN chmod +x server/server-app.jar

# Expose the application port
EXPOSE 8080

# Start the application with our authentication fixes
ENTRYPOINT exec \
  java \
  -Dfile.encoding=UTF-8 -Duser.timezone=GMT \
  -Djava.io.tmpdir=/opt/bytechef/server/tmp \
  -Dserver.tomcat.basedir=/opt/bytechef/server \
  -Dserver.tomcat.accesslog.directory=/opt/bytechef/server/logs \
  -jar server/server-app.jar

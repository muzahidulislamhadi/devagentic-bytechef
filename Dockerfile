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

# Stage 2: Final image
FROM bytechef/bytechef-server:latest

# Set the application home directory
ARG ARG_APPLICATION_HOME=/opt/bytechef

# Create client directories
RUN mkdir -p ${ARG_APPLICATION_HOME}/client/assets

# Copy all built client files from the builder stage
COPY --from=client-builder /app/client/dist/index.html ${ARG_APPLICATION_HOME}/client/
COPY --from=client-builder /app/client/dist/oauth.html ${ARG_APPLICATION_HOME}/client/
COPY --from=client-builder /app/client/dist/favicon.ico ${ARG_APPLICATION_HOME}/client/
COPY --from=client-builder /app/client/dist/mockServiceWorker.js ${ARG_APPLICATION_HOME}/client/
COPY --from=client-builder /app/client/dist/assets/ ${ARG_APPLICATION_HOME}/client/assets/

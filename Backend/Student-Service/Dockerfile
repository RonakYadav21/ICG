# =========================
# Build Stage
# =========================
FROM maven:3.9-eclipse-temurin-17-alpine AS builder

# Set working directory
WORKDIR /app

# Copy pom.xml first
COPY pom.xml .

# Download dependencies separately (Docker cache optimization)
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build application
RUN mvn clean package -DskipTests

# =========================
# Runtime Stage
# =========================
FROM eclipse-temurin:17-jre-alpine

# Set working directory
WORKDIR /app

# Copy only the generated JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose application port
EXPOSE 8081

# Run application
ENTRYPOINT ["java","-jar","app.jar","--spring.profiles.active=docker"]
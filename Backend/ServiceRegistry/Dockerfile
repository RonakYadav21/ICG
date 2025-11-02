# Use lightweight Java 17 runtime
FROM eclipse-temurin:17-jdk-alpine

# Set working directory inside container
WORKDIR /app

# Copy JAR file from target folder to container
COPY target/*.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8761

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]

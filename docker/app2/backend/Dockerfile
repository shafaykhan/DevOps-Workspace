# Stage 1: Build the JAR
FROM maven:3.9.6-eclipse-temurin-21 AS jar_build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=jar_build /build/target/*.jar app.jar
EXPOSE 8082
CMD ["java","-jar","app.jar"]

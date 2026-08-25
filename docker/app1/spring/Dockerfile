FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
CMD ["java","-jar","app.jar"]

# ======================================================
# Development Commands
# ======================================================

# 1. Build Spring Boot JAR
#    mvn clean package

# 2. Run JAR locally (without Docker)
#    java -jar target/<your-app>.jar

# 3. Build Docker Image
#    docker build -t username/image-name:1.0 .

# 4. Run Docker Container
#    docker run -d -p 8080:8080 \
#      -e SPRING_PROFILES_ACTIVE=DEV \
#      --name app \
#      username/image-name:1.0

# Windows (PowerShell)
# docker run -d ^
#   -p 8080:8080 ^
#   -e SPRING_PROFILES_ACTIVE=DEV ^
#   --name app ^
#   username/image-name:1.0

# 5. View Running Containers
#    docker ps

# 6. View Logs
#    docker logs -f app

# 7. Enter Running Container (Bash)
#    docker exec -it app bash/sh

# 8. Stop Container
#    docker stop app

# 9. Start Container
#    docker start app

# 10. Remove Container
#     docker rm -f app

# 11. Remove Image
#     docker rmi username/image-name:1.0
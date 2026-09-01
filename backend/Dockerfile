FROM eclipse-temurin:21-jdk-alpine
VOLUME /tmp
COPY . /app
WORKDIR /app
RUN ./mvnw clean package -DskipTests
ENTRYPOINT ["java","-jar","target/backend-0.0.1-SNAPSHOT.jar"]

# Build stage
FROM maven:3.8-openjdk-18-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -Dmaven.test.skip=true -f /home/app/pom.xml clean package

# Package stage
FROM openjdk:18-alpine
COPY --from=build /home/app/target/semi-0.0.1-SNAPSHOT.jar /usr/local/lib/semi.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/semi.jar"]

FROM openjdk:19
ARG JAR_FILE=target/*.jar
EXPOSE 8080
COPY sampleData.txt ./
COPY ./target/spring-boot-docker.jar spring-boot-docker.jar
ENTRYPOINT [ "java","-jar","/spring-boot-docker.jar" ]
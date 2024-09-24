Install Maven:
wget https://mirrors.estointernet.in/apache/maven/maven-3/3.6.3/binaries/apache-maven-3.6.3-bin.tar.gz
tar -xvf apache-maven-3.6.3-bin.tar.gz
mv apache-maven-3.6.3 /opt/

mvn io.quarkus.platform:quarkus-maven-plugin:3.14.3:create \
    -DprojectGroupId=my-groupId \
    -DprojectArtifactId=my-artifactId
    
./mvnw quarkus:add-extension -Dextensions='hibernate-validator'

./mvnw quarkus:add-extension -Dextensions='smallrye-*'

./mvnw quarkus:add-extension -Dextensions='jdbc-postgresql'

./mvnw quarkus:dev

------------
docker image ls
docker ps
docker stop <>
docker rm <>
-> docker run --rm -e POSTGRES_PASSWORD=root -d --name postgress_db postgres -p 5432:5432
docker rm $(docker ps --filter status=exited -q)
docker run -e POSTGRES_PASSWORD=root -e POSTGRES_USER=postgres -d --network host --name postgres_db postgres
docker exec -it postgres_db /bin/bash
createdb social-media
\c social-media

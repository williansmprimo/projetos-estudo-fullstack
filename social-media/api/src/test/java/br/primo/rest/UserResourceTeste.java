package br.primo.rest;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import br.primo.domain.model.Follower;
import br.primo.domain.model.Post;
import br.primo.domain.model.User;
import br.primo.rest.dto.CreateUserRequest;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.MediaType;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserResourceTeste {

    @BeforeEach
    @Transactional
    public void setUP(){
        Follower.deleteAll();
        Post.deleteAll();
        User.deleteAll();

        var userA = new User();
        userA.setAge(20);
        userA.setName("Fulano");
        userA.persist();
    }

    @Test
    @Order(1)
    @DisplayName("Should create User successfully")
    public void createTest(){
        var userRequest = new CreateUserRequest();
        userRequest.setName("Name");
        userRequest.setAge(30);

        var response = given()
            .contentType(MediaType.APPLICATION_JSON)
            .body(userRequest)
        .when()
            .post("/users")
        .then()
            .extract()
            .response();

        assertEquals(201, response.statusCode());
        assertNotNull(response.jsonPath().get("id"));
    }

    @Test
    @Order(2)
    @DisplayName("Should not create User")
    public void createWithErrorTest(){
        var userRequest = new CreateUserRequest();
        userRequest.setName("");
        userRequest.setAge(20);

        var response = given()
            .contentType(MediaType.APPLICATION_JSON)
            .body(userRequest)
        .when()
            .post("/users")
        .then()
            .extract()
            .response();

        assertEquals(400, response.statusCode()); //Invalid input
        assertEquals("Validation error.", response.jsonPath().getString("message"));
    }

    @Test
    @Order(3)
    @DisplayName("Should list users")
    public void listTest(){
        var response = given()
            .contentType(MediaType.APPLICATION_JSON)
            .header("followerId", 1)
        .when()
            .get("/users")
        .then()
            .extract()
            .response();

        assertEquals(200, response.statusCode());
        // assertEquals(1, response.body().jsonPath().getList("").size());
    }

    @Test
    @Order(4)
    @DisplayName("Should list users")
    public void listTest2(){
        given()
            .contentType(MediaType.APPLICATION_JSON)
            .header("followerId", 1)
        .when()
            .get("/users")
        .then()
            .statusCode(200)
            .body("size()", is(1));
    }
}

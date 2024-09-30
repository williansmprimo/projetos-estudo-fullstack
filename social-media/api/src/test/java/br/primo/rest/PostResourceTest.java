package br.primo.rest;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import br.primo.domain.model.Follower;
import br.primo.domain.model.Post;
import br.primo.domain.model.User;
import br.primo.domain.repository.FollowerRepository;
import br.primo.domain.repository.PostReposotory;
import br.primo.rest.dto.CreatePostRequest;
import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.MediaType;

@QuarkusTest
@TestHTTPEndpoint(PostResource.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class PostResourceTest {

    @Inject
    FollowerRepository followerRepository;

    @Inject
    PostReposotory postReposotory;

    User userA, userB;

    @BeforeEach
    @Transactional
    public void setUP(){
        Follower.deleteAll();
        Post.deleteAll();
        User.deleteAll();

        userA = new User();
        userA.setAge(20);
        userA.setName("Fulano");
        userA.persist();

        userB = new User();
        userB.setAge(21);
        userB.setName("Cicrano");
        userB.persist();

        Follower follower = new Follower();
        follower.setUser(userA);
        follower.setFollower(userB);
        follower.persist();

        var post = new Post();
        post.setText("post text");
        post.setUser(userA);
        post.persist();
    }
    
    @Test
    @Order(5)
    @DisplayName("Shuould not create a Post when user dos not exist")
    public void createTestError(){
        var postRequest = new CreatePostRequest();
        postRequest.setText("New Post");
        given()
            .contentType(MediaType.APPLICATION_JSON)
            .body(postRequest)
            .pathParam("userId", 999)
        .when()
            .post()
        .then()
            .statusCode(404);
    }

    @Test
    @Order(6)
    @DisplayName("Shuould create a Post")
    public void createTest(){
        var postRequest = new CreatePostRequest();
        postRequest.setText("New Post");
        given()
            .contentType(MediaType.APPLICATION_JSON)
            .body(postRequest)
            .pathParam("userId", userA.getId())
        .when()
            .post()
        .then()
            .statusCode(201);
    }

    @Test
    @Order(7)
    @DisplayName("Shuould list a post from a certain user")
    public void listTest(){
        given()
            .contentType(MediaType.APPLICATION_JSON)
            .pathParam("userId", userA.getId())
            .header("followerId", userB.getId())
        .when()
            .get()
        .then()
            .statusCode(200)
            .body("size()", is(1));
    }
}

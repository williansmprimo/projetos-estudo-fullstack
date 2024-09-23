package br.primo.rest;

import br.primo.dto.CreatePostRequest;
import br.primo.dto.PostResponse;
import br.primo.model.PostModel;
import br.primo.model.UserModel;
import br.primo.repository.PostReposotory;
import io.quarkus.panache.common.Sort;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/users/{userId}/posts")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PostResource {

    @Inject() PostReposotory repository;

    @POST
    @Transactional
    public Response create(@PathParam("userId") Long id, CreatePostRequest request){
        UserModel user = UserModel.findById(id);
        if(user == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        var post = new PostModel();
        post.setText(request.getText());
        post.setUser(user);
        repository.persist(post);

        return Response.status(Response.Status.CREATED).entity(post).build();
    }

    @GET
    public Response list(@PathParam("userId") Long id){
        var user = UserModel.findById(id);
        if(user == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        var posts = repository.find("user", Sort.by("time",Sort.Direction.Descending), user)
            .stream()
            .map(i -> PostResponse.fromPost(i))
            .toList();
        return Response.ok(posts).build();
    }
}

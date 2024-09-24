package br.primo.rest;

import br.primo.domain.model.Follower;
import br.primo.domain.model.User;
import br.primo.domain.repository.FollowerRepository;
import br.primo.rest.dto.FollowRequest;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/users/{userId}/followers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FollowerResource {

    @Inject
    private FollowerRepository followerRepository;

    @PUT
    @Transactional
    public Response follow(@PathParam("userId") Long userId, FollowRequest request){
        User user = User.findById(userId);
        User followerUser = User.findById(request.getFollowerId());
        if(user == null || followerUser == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        if(!followerRepository.follows(user, followerUser)){
            Follower follower = new Follower();
            follower.setUser(user);
            follower.setFollower(followerUser);
            followerRepository.persist(follower);
        }
        return Response.ok().build();
    }

    @GET
    public Response followers(@PathParam("userId") Long userId){
        User user = User.findById(userId);
        if(user == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        var followers = followerRepository.find("user", user)
            .stream()
            .map(i -> i.getFollower())
            .toList();
        return Response.ok(followers).build();
    }
}

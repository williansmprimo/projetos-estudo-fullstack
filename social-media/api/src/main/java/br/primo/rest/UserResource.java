package br.primo.rest;
import java.util.ArrayList;
import java.util.Arrays;

import br.primo.dto.CreateUserRequest;
import br.primo.dto.ListUserResponse;
import br.primo.model.UserModel;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class UserResource {

    @POST
    @Transactional
    public Response create(CreateUserRequest user){
        var userModel = new UserModel();
        userModel.setName(user.getName());
        userModel.setAge(user.getAge());
        userModel.persist();

        return Response.ok(userModel).build();
    }

    @GET
    public Response list(){
        var list = UserModel.listAll()
            .stream()
            .map(i -> new ListUserResponse((UserModel) i))
            .toList();
        return Response.ok(list).build();
    }
}
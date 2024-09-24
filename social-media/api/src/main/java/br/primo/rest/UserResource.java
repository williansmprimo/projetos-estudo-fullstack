package br.primo.rest;
import java.util.ArrayList;

import br.primo.domain.model.User;
import br.primo.rest.dto.CreateUserRequest;
import br.primo.rest.dto.ErrorResponse;
import br.primo.rest.dto.FieldError;
import br.primo.rest.dto.ListUserResponse;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Validator;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class UserResource {

    @Inject
    private Validator validator;

    @POST
    @Transactional
    public Response create(CreateUserRequest user){

        if(user == null){
            var error = new ErrorResponse();
            error.setMessage("Invalid input");
            error.setErros(new ArrayList<FieldError>());
            return Response.status(400).entity(error).build();
        }

        var userModel = new User();
        userModel.setName(user.getName());
        userModel.setAge(user.getAge());

        var violations = validator.validate(userModel);
        if(!violations.isEmpty()){
            var error = ErrorResponse.createFromViolations(violations);
            return Response.status(400).entity(error).build();
        }

        userModel.persist();
        return Response.ok(userModel).build();
    }

    @PUT
    @Path("{id}")
    public Response update(@PathParam("id") long id,CreateUserRequest user){

        if(user == null){
            var error = new ErrorResponse();
            error.setMessage("Invalid input");
            error.setErros(new ArrayList<FieldError>());
            return Response.status(400).entity(error).build();
        }

        User userModel = User.findById(id);
        userModel.setName(user.getName());
        userModel.setAge(user.getAge());

        var violations = validator.validate(userModel);
        if(!violations.isEmpty()){
            var error = ErrorResponse.createFromViolations(violations);
            return Response.status(400).entity(error).build();
        }

        userModel.persist();
        return Response.ok(userModel).build();
    }

    @GET
    public Response list(){
        var list = User.listAll()
            .stream()
            .map(i -> new ListUserResponse((User) i))
            .toList();
        return Response.ok(list).build();
    }
}
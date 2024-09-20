package br.primo.rest;
import java.util.ArrayList;

import br.primo.dto.CreateUserRequest;
import br.primo.dto.ErrorResponse;
import br.primo.dto.FieldError;
import br.primo.dto.ListUserResponse;
import br.primo.model.UserModel;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Validator;
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

        var userModel = new UserModel();
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
        var list = UserModel.listAll()
            .stream()
            .map(i -> new ListUserResponse((UserModel) i))
            .toList();
        return Response.ok(list).build();
    }
}
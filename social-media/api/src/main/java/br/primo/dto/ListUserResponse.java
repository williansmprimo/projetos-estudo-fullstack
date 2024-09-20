package br.primo.dto;

import br.primo.model.UserModel;
import lombok.Data;

@Data
public class ListUserResponse {
    private Integer id;
    private String name;
    private Integer age;

    public ListUserResponse(UserModel user){
        this.setName(user.getName());
        this.setAge(user.getAge());
    }
}

package br.primo.rest.dto;

import br.primo.domain.model.User;
import lombok.Data;

@Data
public class ListUserResponse {
    private Integer id;
    private String name;
    private Integer age;

    public ListUserResponse(User user){
        this.setName(user.getName());
        this.setAge(user.getAge());
    }
}

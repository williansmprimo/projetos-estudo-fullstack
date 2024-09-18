package br.primo.dto;

import br.primo.model.UserModel;

public class ListUserResponse {
    private Integer id;
    private String name;
    private Integer age;

    public ListUserResponse(UserModel user){
        this.setName(user.getName());
        this.setAge(user.getAge());
    }

    public Integer getAge() {
        return age;
    }
    
    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

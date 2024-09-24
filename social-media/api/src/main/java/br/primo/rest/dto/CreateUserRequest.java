package br.primo.rest.dto;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String name;
    private Integer age;
}

package br.primo.dto;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String name;
    private Integer age;
}

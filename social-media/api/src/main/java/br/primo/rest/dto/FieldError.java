package br.primo.rest.dto;

import lombok.Data;

@Data
public class FieldError {
    private String message;
    private String field;

    public FieldError(String field, String message){
        this.field = field;
        this.message = message;
    }
}

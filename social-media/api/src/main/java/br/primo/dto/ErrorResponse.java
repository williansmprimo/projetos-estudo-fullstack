package br.primo.dto;

import java.util.Collection;
import java.util.Set;

import jakarta.validation.ConstraintViolation;
import lombok.Data;

@Data
public class ErrorResponse {
    private String message;
    private Collection<FieldError> erros;

    public static <T> ErrorResponse createFromViolations(Set<ConstraintViolation<T>> violations){
        var erros = violations.stream()
            .map(i -> new FieldError(i.getPropertyPath().toString(), i.getMessage()))
            .toList();
        var error = new ErrorResponse();

        error.setMessage("Validation error.");
        error.setErros(erros);

        return error;
    }
}

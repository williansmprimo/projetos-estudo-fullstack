package br.primo.rest.dto;

import java.time.LocalDateTime;

import br.primo.domain.model.Post;
import lombok.Data;

@Data
public class PostResponse {
    private String text;
    private LocalDateTime time;

    public PostResponse(String text, LocalDateTime time) {
        this.text = text;
        this.time = time;
    }

    public static PostResponse fromPost(Post post){
        return new PostResponse(post.getText(), post.getTime());
    }
}

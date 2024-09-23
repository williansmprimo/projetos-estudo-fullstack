package br.primo.dto;

import java.time.LocalDateTime;

import br.primo.model.PostModel;
import lombok.Data;

@Data
public class PostResponse {
    private String text;
    private LocalDateTime time;

    public PostResponse(String text, LocalDateTime time) {
        this.text = text;
        this.time = time;
    }

    public static PostResponse fromPost(PostModel post){
        return new PostResponse(post.getText(), post.getTime());
    }
}

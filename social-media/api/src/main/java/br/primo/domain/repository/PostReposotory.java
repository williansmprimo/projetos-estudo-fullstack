package br.primo.domain.repository;

import br.primo.domain.model.Post;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PostReposotory implements PanacheRepository<Post> {}

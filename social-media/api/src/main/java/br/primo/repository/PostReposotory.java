package br.primo.repository;

import br.primo.model.PostModel;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PostReposotory implements PanacheRepository<PostModel> {}

package br.primo.domain.repository;

import br.primo.domain.model.Follower;
import br.primo.domain.model.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Parameters;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class FollowerRepository implements PanacheRepository<Follower>{
    public boolean follows(User user, User follower){
        var params = Parameters.with("user", user)
            .and("follower", follower).map();
        var result = find("user = :user and follower = :follower", params);
        return result.firstResultOptional().isPresent();
    }
}

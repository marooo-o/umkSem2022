package sem.semi.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import sem.semi.entities.UserEntity;

@Repository
public interface UserRepository extends MongoRepository<UserEntity, String> {
    @Query("{email :?0}")
    UserEntity findUserModelByEmail(String email);
}

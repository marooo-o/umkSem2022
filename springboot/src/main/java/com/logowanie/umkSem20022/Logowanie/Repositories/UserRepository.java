package com.logowanie.umkSem20022.Logowanie.Repositories;

import com.logowanie.umkSem20022.Logowanie.Model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserModel, String> {

    UserModel findUserModelByEmail(String email);


}
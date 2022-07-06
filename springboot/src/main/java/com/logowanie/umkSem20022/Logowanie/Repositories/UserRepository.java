package com.logowanie.umkSem20022.Logowanie.Repositories;

import com.logowanie.umkSem20022.Logowanie.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByEmailAndPassword(String email, String[] password);
    @Query("{email:'?0'}")
    User findByEmail(String email);




}
package com.logowanie.umkSem20022.Logowanie.Service;

import com.logowanie.umkSem20022.Logowanie.Model.User;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


public interface UserService {

    @Query("{'email':?0}")
    User getUserByEmail(String Email);
    List<User> findAllUsers();
    @Query("{'email':?0, 'password':?1}")

    User loginByEmailAndPassword(String email, String[] password);

}

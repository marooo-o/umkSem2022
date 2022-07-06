package com.logowanie.umkSem20022.Logowanie.Service.Impl;

import com.logowanie.umkSem20022.Logowanie.Model.User;
import com.logowanie.umkSem20022.Logowanie.Repositories.UserRepository;
import com.logowanie.umkSem20022.Logowanie.Service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

   private UserRepository userRepository;

   public UserServiceImpl(){
       super();
       this.userRepository = userRepository;
   }

    @Override
    public User getUserByEmail(String Email) {
        return userRepository.findByEmail(Email);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }


}

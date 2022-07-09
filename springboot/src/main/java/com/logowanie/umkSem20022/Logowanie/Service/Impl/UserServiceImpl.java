package com.logowanie.umkSem20022.Logowanie.Service.Impl;

import com.logowanie.umkSem20022.Logowanie.Model.User;
import com.logowanie.umkSem20022.Logowanie.Repositories.UserRepository;
import com.logowanie.umkSem20022.Logowanie.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

//   private UserRepository userRepository;

    @Autowired
    UserRepository userRepository;

//   public UserServiceImpl(){
//       super();
//
//   }

    @Override
    public User getUserByEmail(String Email) {
        return userRepository.findUserByEmail(Email);
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User loginByEmailAndPassword(String email, String[] password){

    }


}

package com.logowanie.umkSem20022.Logowanie.Service;

import com.logowanie.umkSem20022.Logowanie.Model.UserModel;
import com.logowanie.umkSem20022.Logowanie.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String emailToFind) throws UsernameNotFoundException {

       UserModel userModel = userRepository.findUserByEmail(emailToFind);
       if(userModel == null) {
           return null;
       }

       String email = userModel.getEmail();
       String[] password = userModel.getPassword();

        String pwd = Arrays.stream(password).toString();


       return new User(email, pwd, new ArrayList<>());

    }


}

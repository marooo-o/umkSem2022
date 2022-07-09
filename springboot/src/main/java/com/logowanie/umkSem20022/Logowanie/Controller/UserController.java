package com.logowanie.umkSem20022.Logowanie.Controller;

import com.logowanie.umkSem20022.Logowanie.Model.User;
import com.logowanie.umkSem20022.Logowanie.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Spring")
public class UserController {

//    private UserService userService;
    @Autowired
    UserService userService;



    public UserController(UserService userService){
        super();
        this.userService = userService;
    }

    @GetMapping("/email")
    public User getUserByEmail(String email){

        return userService.getUserByEmail(email);
    }

    @GetMapping("/getall")
    public List<User> findAllUsers(){
        return userService.findAllUsers();
    }
}

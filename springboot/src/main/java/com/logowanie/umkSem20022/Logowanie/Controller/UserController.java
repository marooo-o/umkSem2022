package com.logowanie.umkSem20022.Logowanie.Controller;

import com.logowanie.umkSem20022.Logowanie.Model.User;
import com.logowanie.umkSem20022.Logowanie.Service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/Spring")
public class UserController {

    private UserService userService;



    public UserController(UserService userService){
        super();
        this.userService = userService;
    }

    @GetMapping("/email")
    public User getUserByEmail(String email){
        User chuj = userService.getUserByEmail(email);

        return chuj;
    }

    @GetMapping("/getall")
    public List<User> findAllUsers(){
        return userService.findAllUsers();
    }
}

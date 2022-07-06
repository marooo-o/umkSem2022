package com.logowanie.umkSem20022;

import com.logowanie.umkSem20022.Logowanie.Controller.UserController;
import com.logowanie.umkSem20022.Logowanie.Repositories.UserRepository;
import com.logowanie.umkSem20022.Logowanie.Service.Impl.UserServiceImpl;
import com.logowanie.umkSem20022.Logowanie.Service.UserService;
//import com.logowanie.umkSem20022.config.SecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;

@SpringBootApplication
public class UmkSem20022Application {

	public static void main(String[] args) {
		SpringApplication.run(UmkSem20022Application.class, args);
	}


	@Bean
	public UserService userService(){
		return new UserServiceImpl();
	}

//	@Bean
//	public DataSource dataSource(){
//		return new SecurityConfig();
//	}

}



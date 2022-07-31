package com.logowanie.umkSem20022;


//import com.logowanie.umkSem20022.Logowanie.Service.Impl.UserServiceImpl;
import com.logowanie.umkSem20022.Logowanie.Service.UserService;
import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import javax.sql.DataSource;


@SpringBootApplication
@EnableMongoRepositories(
		basePackages = {"com.logowanie.umkSem20022.Logowanie.Repositories"}
)
public class UmkSem20022Application {

	public static void main(String[] args) {
		SpringApplication.run(UmkSem20022Application.class, args);
	}



//	@Bean
//	public UserService userService(){
//		return new UserServiceImpl();
//	}


//	@Bean
//	public DataSource dataSource(){
//		return new SecurityConfig();
//	}


}



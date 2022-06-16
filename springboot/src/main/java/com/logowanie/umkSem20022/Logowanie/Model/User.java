package com.logowanie.umkSem20022.Logowanie.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//import java.util.ArrayList;

@Document("user")
public class User {

    @Id
    private String _id;
    private String email;
    private String[] password;

    public User(String _id, String email, String[] password) {
        this._id = _id;
        this.email = email;
        this.password = password;
    }
}

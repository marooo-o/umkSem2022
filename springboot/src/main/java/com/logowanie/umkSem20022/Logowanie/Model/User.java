package com.logowanie.umkSem20022.Logowanie.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;


@Document(collection = "user")
public class User {

    @Id
    private String _id;
    private String email;
    private String[] password;
    private boolean confirmed;

    public User(){

    }

    public User(String _id, String email, String[] password) {
        this._id = _id;
        this.email = email;
        this.password = password;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String[] getPassword() {
        return password;
    }

    public void setPassword(String[] password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "_id='" + _id + '\'' +
                ", email='" + email + '\'' +
                ", password=" + Arrays.toString(password) +
                '}';
    }
}

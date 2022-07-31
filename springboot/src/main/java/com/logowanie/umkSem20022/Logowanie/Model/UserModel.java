package com.logowanie.umkSem20022.Logowanie.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "user")
public class UserModel {

    @Id
    private String _id;
    private String email;
    private String[] password;
    private String name;
    private boolean confirmed;

    public UserModel(){

    }

    public UserModel(String _id, String email, String[] password, boolean confirmed) {
        this._id = _id;
        this.email = email;
        this.password = password;
        this.confirmed = confirmed;
    }

    public boolean isConfirmed() {
        return confirmed;
    }

    public void setConfirmed(boolean confirmed) {
        this.confirmed = confirmed;
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


}

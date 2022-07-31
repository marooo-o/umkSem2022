package com.logowanie.umkSem20022.security;

import com.logowanie.umkSem20022.Logowanie.Model.Chuj;

public class AuthenticationRequest {

    private String email;
    private Chuj[] password;

    public AuthenticationRequest() {
    }

    public String getName() {
        return email;
    }

    public void setName(String email) {
        this.email = email;
    }

    public Chuj[] getPassword() {
        return password;
    }


}

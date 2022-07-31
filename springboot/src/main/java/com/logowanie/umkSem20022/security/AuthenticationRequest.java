package com.logowanie.umkSem20022.security;

public class AuthenticationRequest {

    private String email;
    private String[] password;

    public AuthenticationRequest() {
    }

    public String getName() {
        return email;
    }

    public String[] getPassword() {
        return password;
    }


}

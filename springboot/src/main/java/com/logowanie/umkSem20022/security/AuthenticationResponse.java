package com.logowanie.umkSem20022.security;

public class AuthenticationResponse {

    private String response;

    public AuthenticationResponse() {
    }

    public String getAuthResponse() {
        return response;
    }

    public AuthenticationResponse(String response) {
        this.response = response;
    }

    public void setAuthResponse(String response) {
        this.response = response;
    }
}

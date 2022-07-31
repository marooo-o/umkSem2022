package com.logowanie.umkSem20022.Logowanie.Controller;


import com.logowanie.umkSem20022.security.AuthenticationRequest;
import com.logowanie.umkSem20022.security.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/Spring")
public class UserController {


    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateClient(@RequestBody AuthenticationRequest authenticationRequest){
        String email = authenticationRequest.getName();
        String[] password = authenticationRequest.getPassword();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (Exception e) {
            e.printStackTrace();
        }



        return ResponseEntity.ok(new AuthenticationResponse("succes login for user: " + email));
    }
}

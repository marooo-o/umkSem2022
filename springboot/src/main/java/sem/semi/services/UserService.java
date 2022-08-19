package sem.semi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import sem.semi.JSON.LoginModel;
import sem.semi.JSON.PassModel;
import sem.semi.entities.UserEntity;
import sem.semi.repositories.UserRepository;
import sem.semi.security.JwtTokenUtil;

import java.util.*;

@Service
public class UserService implements UserDetailsService{

    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    JwtTokenUtil jwtTokenUtil;


    public ResponseEntity login(LoginModel loginModel) {

        String[] emailWithNumbers = new String[5];
        Arrays.fill(emailWithNumbers, "");
        String[] passwords = new String[5];
        Arrays.fill(passwords, "");
        int index = 0;

        for(PassModel passModel : loginModel.getPassModels()){
            emailWithNumbers[index] += String.valueOf(passModel.getPosition()-1);
            emailWithNumbers[index] += "_";
            emailWithNumbers[index] += loginModel.getEmail();
            passwords[index] += passModel.getCharacter();
            index++;
        }

            Map<String, Object> responseMap = new HashMap<>();
            try {
                for(int i=0; i<5; i++){
                    Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(emailWithNumbers[i], passwords[i]));
                    if(!auth.isAuthenticated()){
                        responseMap.put("error", true);
                        responseMap.put("message", "Invalid Credentials");
                        return ResponseEntity.status(401).body(responseMap);
                    }
                }
                UserDetails userDetails = loadUserByUsername(emailWithNumbers[4]);
                String token = jwtTokenUtil.generateToken(userDetails);
                responseMap.put("error", false);
                responseMap.put("message", "Logged In");
                responseMap.put("token", token);
                return ResponseEntity.ok(responseMap);

            } catch (DisabledException e) {
                e.printStackTrace();
                responseMap.put("error", true);
                responseMap.put("message", "User is disabled");
                return ResponseEntity.status(500).body(responseMap);
            } catch (BadCredentialsException e) {
                responseMap.put("error", true);
                responseMap.put("message", "Invalid Credentials");
                return ResponseEntity.status(401).body(responseMap);
            } catch (Exception e) {
                e.printStackTrace();
                responseMap.put("error", true);
                responseMap.put("message", "Something went wrong");
                return ResponseEntity.status(500).body(responseMap);
            }

    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        int number;
        int index;
        String[] password;
        String _email = email;
        index = _email.indexOf("_");
        number = Integer.parseInt(_email.substring(0, index));
        _email = _email.substring(index+1);

        UserEntity user = userRepository.findUserModelByEmail(_email);

        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority(user.getAuthority()));

        password = user.getPass();

        return new User(email, password[number], authorityList);
    }

    public int getPassLen(String email) {

        UserEntity user1 = userRepository.findUserModelByEmail(email);
        String[] pass = user1.getPass();
        int dupa = pass.length;
        return dupa;
    }

}
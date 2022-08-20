package sem.semi.controllers;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import sem.semi.JSON.LoginModel;
import sem.semi.services.UserService;

import javax.annotation.security.RolesAllowed;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/Spring")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginModel loginModel){
        return userService.login(loginModel);
    }

    @RolesAllowed("ROLE_ADMIN")
    @GetMapping("/admin")
    public Map<String, Object> admin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("username", authentication.getName());
        userMap.put("error", false);

        return userMap;
    }

    @RolesAllowed("ROLE_USER")
    @GetMapping("/user")
    public Map<String, Object> user() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> userMap = new HashMap<>();
        userMap.put("username", authentication.getName());
        userMap.put("auth", authentication.getAuthorities());
        userMap.put("error", false);

        return userMap;
    }

    @GetMapping("/auth/passlen")
    public ResponseEntity passLen(@RequestHeader("email") String email) {
        return userService.getPassLen(email);
    }

}

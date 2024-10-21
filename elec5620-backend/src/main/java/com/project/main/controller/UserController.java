package com.project.main.controller;


import com.project.main.entity.User;
import com.project.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:5173") 
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User newUser = userService.registerUser(user);
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(e.getMessage()); // 409 Conflict if email already exists
        }
    }

    @CrossOrigin(origins = "http://localhost:5173") 
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            User user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(user); // Return the user object with a 200 OK status
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage()); // 401 Unauthorized for login failures
        }
    }


}

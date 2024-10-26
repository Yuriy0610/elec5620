package com.project.main.controller;

import com.project.main.entity.Appointment;
import com.project.main.entity.User;
import com.project.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser (@RequestBody User user) {
        try {
            User newUser  = userService.registerUser (user);
            return ResponseEntity.ok(newUser );
        } catch (Exception e) {
            // Return a JSON object with the error message
            return ResponseEntity.status(409).body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            User user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/{userId}/appointments")
    public ResponseEntity<?> addAppointment(@PathVariable Long userId, @RequestBody Appointment appointment) {
        try {
            Appointment newAppointment = userService.addAppointmentForUser(userId, appointment);
            return ResponseEntity.ok(newAppointment);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping("/{userId}/appointments")
    public ResponseEntity<?> getAppointments(@PathVariable Long userId) {
        try {
            List<Appointment> appointments = userService.getAppointmentsForUser(userId);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}

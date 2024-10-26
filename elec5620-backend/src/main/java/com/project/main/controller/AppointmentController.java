package com.project.main.controller;

import com.project.main.entity.Appointment;
import com.project.main.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/create/{userId}")
    public ResponseEntity<?> createAppointment(@PathVariable Long userId, @RequestBody Appointment appointment) {
        try {
            Appointment newAppointment = appointmentService.createAppointment(userId, appointment);
            return ResponseEntity.ok(newAppointment);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByUserId(@PathVariable Long userId) {
        List<Appointment> appointments = appointmentService.getAppointmentsByUserId(userId);
        return ResponseEntity.ok(appointments);
    }
}

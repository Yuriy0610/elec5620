package com.project.main.service;

import com.project.main.entity.Appointment;
import com.project.main.entity.User;
import com.project.main.repository.AppointmentRepository;
import com.project.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    public Appointment createAppointment(Long userId, Appointment appointment) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));

        appointment.setUser(user);  // Set the user for the appointment
        return appointmentRepository.save(appointment);  // Save the appointment
    }
}

package com.project.main.service;

import com.project.main.entity.Appointment;
import com.project.main.entity.User;
import com.project.main.repository.AppointmentRepository;
import com.project.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    public User registerUser(User user) throws Exception {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new Exception("User with this email already exists.");
        }
        return userRepository.save(user);
    }

    public User loginUser(String email, String password) throws Exception {
        Optional<User> user = userRepository.findByEmail(email);
        if (!user.isPresent()) {
            throw new Exception("User not found.");
        }
        if (!user.get().getPassword().equals(password)) {
            throw new Exception("Invalid credentials.");
        }
        return user.get();
    }

    public Appointment addAppointmentForUser(Long userId, Appointment appointment) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found."));
        user.addAppointment(appointment);
        appointment.setUser(user);
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentsForUser(Long userId) throws Exception {
        return appointmentRepository.findByUserId(userId);
    }
}

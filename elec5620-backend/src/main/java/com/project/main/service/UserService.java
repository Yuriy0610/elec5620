package com.project.main.service;

import com.project.main.entity.User;
import com.project.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

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

    
// @Transactional

//     // Update to add a new chat while keeping the list under 20
//     public User registerChat(String email, String chat) throws Exception {
//     Optional<User> userOpt = userRepository.findByEmail(email);
//     if (!userOpt.isPresent()) {
//         throw new Exception("User not found.");
//     }
//     User user = userOpt.get();

//     // Initialize recentChats if it's null
//     List<String> recentChats = user.getRecentChats();
//     if (recentChats == null) {
//         recentChats = new ArrayList<>();
//     }

//     // Add new chat and ensure list size does not exceed 20
//     if (recentChats.size() >= 20) {
//         recentChats.remove(0); // Remove oldest chat if limit is exceeded
//     }
//     recentChats.add(chat);

//     user.setRecentChats(recentChats);
//     return userRepository.save(user);
// }



}

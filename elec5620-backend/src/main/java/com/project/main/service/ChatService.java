package com.project.main.service;

import com.project.main.entity.Appointment;
import com.project.main.entity.Chat;
import com.project.main.entity.User;
import com.project.main.repository.ChatRepository;
import com.project.main.repository.ChatRepository;
import com.project.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    public Chat createChat(Long userId, Chat chat) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(() -> new Exception("User not found"));
        chat.setUser(user);
        return chatRepository.save(chat);
    }    

    public List<Chat> getChatByUserId(Long userId) {
        return chatRepository.findByUserId(userId);
    }
}

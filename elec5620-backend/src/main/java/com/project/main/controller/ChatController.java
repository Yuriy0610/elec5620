package com.project.main.controller;

import com.project.main.entity.Chat;
import com.project.main.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/create/{userId}")
    public ResponseEntity<?> createChat(@PathVariable Long userId, @RequestBody Chat chat) {
        try {
            Chat newchat = chatService.createChat(userId, chat);
            return ResponseEntity.ok(newchat);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Chat>> getAppointmentsByUserId(@PathVariable Long userId) {
        List<Chat> chats = chatService.getChatByUserId(userId);
        return ResponseEntity.ok(chats);
    }
}

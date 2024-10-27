package com.project.main.controller;

import com.project.main.entity.ChatRequest;
import com.project.main.entity.ChatResponse;
import com.project.main.service.OllamaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Ollama Controller", description = "Endpoints for interacting with ollama model in different roles")
public class OllamaController {

    private final OllamaService ollamaService;

    @PostMapping("/chat/{role}")
    public ResponseEntity<ChatResponse> chat(
            @PathVariable String role,
            @RequestParam String university,
            @RequestBody ChatRequest request) {
        log.info("Received chat request for role: {}, university: {}, message: {}", role, university, request.getMessage());
        return ResponseEntity.ok(ollamaService.chat(role, request.getMessage(), university));
    }

    @PostMapping("/get/{role}")
    public ResponseEntity<ChatResponse> chat(
            @PathVariable String role,
            @RequestBody ChatRequest request) {
        log.info("Received chat request for role: {}, message: {}", role, request.getMessage());
        return ResponseEntity.ok(ollamaService.getNews(role, request.getMessage()));
    }

}
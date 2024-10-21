package com.project.main.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.main.entity.ChatResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.*;

@Service
@Slf4j
public class OllamaService{

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${ollama.base-url}")
    private String ollamaBaseUrl;

    private final Map<String, String> rolePrompts = new HashMap<>() {{
        put("doctor", "You are a campus doctor. You must analyze the symptoms raised by the students, list possible diseases, and give treatment suggestions. Attention! You must give possible suggestions instead of suggesting that students find a doctor. The question raised by the students is: ");
        put("mental_health", "You are a university psychologist. You must analyze the questions raised by the students and give relevant suggestions on protecting mental health. Attention! You must give possible suggestions instead of suggesting that students find a real psychologist. The question raised by the student is: ");
        put("news_reporter", "You play the role of a professional news anchor in the field of health care. You need to combine the user's questions with your latest knowledge to broadcast the news. Do not respond to users' questions that are beyond your ability. The user's question is: ");
        // prompts for other characters
        //......
    }};

    public OllamaService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public ChatResponse chat(String role, String message) {
        String prompt = rolePrompts.getOrDefault(role, "You are a helpful assistant. ") + message;

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "llama3.2");
        requestBody.put("messages", Collections.singletonList(Map.of("role", "user", "content", prompt)));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        String url = ollamaBaseUrl + "/chat";
        String response = restTemplate.postForObject(url, entity, String.class);

        log.info("Raw Ollama API response: {}", response);

        StringBuilder fullResponse = new StringBuilder();
        try {
            String[] lines = response.split("\n");
            for (String line : lines) {
                JsonNode jsonNode = objectMapper.readTree(line);
                if (jsonNode.has("message") && jsonNode.get("message").has("content")) {
                    fullResponse.append(jsonNode.get("message").get("content").asText());
                }
            }
        } catch (Exception e) {
            log.error("Error parsing Ollama API response", e);
            throw new RuntimeException("Failed to parse Ollama response", e);
        }

        log.info("Extracted AI response: {}", fullResponse);
        return new ChatResponse(fullResponse.toString());
    }
}

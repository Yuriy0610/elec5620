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
public class OllamaService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${ollama.base-url}")
    private String ollamaBaseUrl;

    private final Map<String, String> rolePrompts = new HashMap<>() {{
        put("doctor", "You are a campus doctor. Analyze the symptoms raised by students from ");
        put("mental_health", "You are a university psychologist. Provide mental health suggestions to students from ");
        put("news_reporter", "You are a health news reporter, broadcasting relevant health news for students from ");
        put("health_support_quick_links", "Thanks for dropping by! Here are the links you are looking for from ");
    }};

    public OllamaService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public ChatResponse chat(String role, String message, String universityName) {
        String prompt;
        if ("health_support_quick_links".equals(role)) {
            if(universityName.equals("All")){
                prompt = "What are some quick health care tips and resources available from popular universities in Australia? Also, provide some quick lines and links!";
            }else{
                prompt = "What are some quick health care tips and resources available from " + universityName + "? Also, provide some quick lines and links!";
            }
        } else {
            prompt = rolePrompts.getOrDefault(role, "You are a helpful assistant for ") + message;
        }

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

    public ChatResponse getNews(String role, String message) {
        String prompt;

        if ("news_reporter".equals(role)) {
            prompt = "What are some most recent health alerts and care tips in Australia?";

        } else {
            prompt = rolePrompts.getOrDefault(role, "You are a helpful assistant for ") + message;
        }

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
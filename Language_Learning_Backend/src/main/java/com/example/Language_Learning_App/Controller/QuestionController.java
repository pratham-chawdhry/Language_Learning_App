package com.example.Language_Learning_App.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/question")
public class QuestionController {

    private final RestTemplate restTemplate;

    @Value("${python.api.url}")
    private String pythonApiUrl;

    public QuestionController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/generateQuestion")
    public ResponseEntity<String> generateQuestion(
            @RequestParam String questionType,
            @RequestParam String language) {

        String url = pythonApiUrl + "/generate_question?questionType=" + questionType + "&language=" + language;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/generateCharacters")
    public ResponseEntity<String> generateCharacters(@RequestParam String language) {
        String url = pythonApiUrl + "/generate_characters?language=" + language;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        return ResponseEntity.ok(response.getBody());
    }
}

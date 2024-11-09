package com.example.Language_Learning_App.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.Language_Learning_App.Model.User;
import com.example.Language_Learning_App.Request.TestEndRequest;
import com.example.Language_Learning_App.Response.ArrangeQuestion;
import com.example.Language_Learning_App.Response.FillintheBlank;
import com.example.Language_Learning_App.Response.PassageQuestion;
import com.example.Language_Learning_App.Response.Pronounciations;
import com.example.Language_Learning_App.Response.SoundQuestion;
import com.example.Language_Learning_App.Service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private UserService userService;
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
        String ques = questionType;
        if (questionType.equals("1")) {
            questionType = "Generate a unique, engaging fill-in-the-blank question for language learning. Each question should be between 6 to 10 words, have a specific context, and encourage understanding of common expressions, idioms, or conversational phrases. Return the question, options, and answer.";
        }
        if (questionType.equals("2")) {
            questionType = "generate passage of from 30 to 40 words and ask question give answer of limit 10 words and 4 options as well";
        }
        if (questionType.equals("3")) {
            questionType = "give a sentence in the provided language max 10 words, just return sentence field, field should be sentence not any other";
        }
        if (questionType.equals("4")) {
            questionType = "give a full sentence in the provided language and give a list of options in English to be arranged in the correct order to form the answer in english that is translation of given sentence. Only return the sentence, options, and answer , answer in string form. no other fields";
        }
        String url = pythonApiUrl + "/generate_question?questionType=" + questionType + "&language=" + language;
        // Send request and get response
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        if (ques.equals("2")) {
            try {
                // Parse the main response body as a JSON node
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(response.getBody());

                // Extract the embedded JSON string from the `question` field
                String embeddedJsonString = rootNode.path("question").asText();

                // Use a regular expression to isolate the JSON object inside the ```json block
                String jsonString = embeddedJsonString.replaceAll("(?s).*?```json\\n(\\{.*?\\})\\n```.*", "$1");
                // Parse the isolated JSON string into a PassageQuestion object
                PassageQuestion passageQuestion = objectMapper.readValue(jsonString, PassageQuestion.class);

                // Print or log the parsed response fields
                System.out.println("Passage: " + passageQuestion.getPassage());
                System.out.println("Question: " + passageQuestion.getQuestion());
                System.out.println("Answer: " + passageQuestion.getAnswer());

                // Return the parsed PassageQuestion object as JSON in the response
                return ResponseEntity.ok().body(objectMapper.writeValueAsString(passageQuestion));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Error processing JSON response");
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Unexpected error occurred");
            }
        }
        System.out.println("questionType : " + questionType);
        if (ques.equals("1")) {
            try {
                System.out.println("response.getBody() : " + response.getBody());
                // Parse the main response body as a JSON node
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(response.getBody());

                // Extract the embedded JSON string from the `question` field
                String embeddedJsonString = rootNode.path("question").asText();

                // Use a regular expression to isolate the JSON object inside the ```json block
                String jsonString = embeddedJsonString.replaceAll("(?s).*?```json\\n(\\{.*?\\})\\n```.*", "$1");

                // Parse the isolated JSON string into a FillintheBlank object
                FillintheBlank fillInTheBlank = objectMapper.readValue(jsonString, FillintheBlank.class);

                // Print or log the parsed response fields
                System.out.println("Question: " + fillInTheBlank.getQuestion());
                System.out.println("Answer: " + fillInTheBlank.getAnswer());

                // Return the parsed FillintheBlank object as JSON in the response
                return ResponseEntity.ok().body(objectMapper.writeValueAsString(fillInTheBlank));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Error processing JSON response");
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Unexpected error occurred");
            }
        }
        // if (ques.equals("4")) {
        // try {
        // // Extract the embedded JSON string from the response
        // ObjectMapper objectMapper = new ObjectMapper();
        // JsonNode rootNode = objectMapper.readTree(response.getBody());

        // // Get the embedded JSON inside the question field
        // String embeddedJsonString = rootNode.path("question").asText();

        // // Use regex to isolate the JSON content within the code block
        // String jsonString =
        // embeddedJsonString.replaceAll("(?s).*?```json\\n(\\{.*?\\})\\n```.*", "$1");

        // // Parse the JSON into ArrangeQuestion
        // ArrangeQuestion arrangeQuestion = objectMapper.readValue(jsonString,
        // ArrangeQuestion.class);

        // // Print or log the parsed response fields
        // System.out.println("Sentence: " + arrangeQuestion.getSentence());
        // System.out.println("Options: " + arrangeQuestion.getOptions());
        // System.out.println("Answer: " + arrangeQuestion.getAnswer());

        // // Return the parsed ArrangeQuestion object as JSON in the response
        // return
        // ResponseEntity.ok().body(objectMapper.writeValueAsString(arrangeQuestion));
        // } catch (JsonProcessingException e) {
        // e.printStackTrace();
        // return ResponseEntity.status(500).body("Error processing JSON response");
        // } catch (Exception e) {
        // e.printStackTrace();
        // return ResponseEntity.status(500).body("Unexpected error occurred");
        // }

        // }
        if (ques.equals("4")) {
            System.out.println("response.getBody() : " + response.getBody());
            try {
                // Extract the main JSON from the response body
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(response.getBody());

                // Extract the embedded JSON string inside the "question" field
                String embeddedJsonString = rootNode.path("question").asText();

                // Isolate the JSON content within the code block using a regular expression
                String jsonString = embeddedJsonString.replaceAll("(?s).*?```json\\n(\\{.*?\\})\\n```.*", "$1");

                // Parse the extracted JSON string into the ArrangeQuestion object
                ArrangeQuestion arrangeQuestion = objectMapper.readValue(jsonString, ArrangeQuestion.class);

                // Print or log the response fields
                System.out.println("Sentence: " + arrangeQuestion.getSentence());
                System.out.println("Options: " + arrangeQuestion.getOptions());
                System.out.println("Answer: " + arrangeQuestion.getAnswer());

                // Return the parsed ArrangeQuestion object as a JSON response
                return ResponseEntity.ok().body(objectMapper.writeValueAsString(arrangeQuestion));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Error processing JSON response");
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Unexpected error occurred");
            }
        }
        if (ques.equals("3")) {
            try {
                System.out.println("response.getBody() : " + response.getBody());
                // Parse the main response body as a JSON node
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(response.getBody());

                // Extract the embedded JSON string from the `question` field
                String embeddedJsonString = rootNode.path("question").asText();

                // Use a regular expression to isolate the JSON object inside the ```json block
                String jsonString = embeddedJsonString.replaceAll("(?s).*?```json\\n(\\{.*?\\})\\n```.*", "$1");

                // Parse the isolated JSON string into a FillintheBlank object
                SoundQuestion soundQuestion = objectMapper.readValue(jsonString, SoundQuestion.class);

                // Print or log the parsed response fields
                System.out.println("Question: " + soundQuestion.getSentence());

                // Return the parsed FillintheBlank object as JSON in the response
                return ResponseEntity.ok().body(objectMapper.writeValueAsString(soundQuestion));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Error processing JSON response");
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Unexpected error occurred");
            }
        }
        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/generateCharacters")
    public ResponseEntity<?> generateCharacters(@RequestParam String language) {
        String url = pythonApiUrl + "/generate_characters?language=" + language;
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        try {
            System.out.println("response.getBody() : " + response.getBody());

            // Parse the main response body as a JSON node
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getBody());

            // Extract the `characters` field as an embedded JSON array string
            String charactersJsonString = rootNode.path("characters").asText();

            // Parse the isolated JSON string into a List of Pronunciations objects
            List<Pronounciations> pronunciationsList = objectMapper.readValue(
                    charactersJsonString,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, Pronounciations.class));

            // Remove slashes from `letter` and `pronunciation` fields
            List<Pronounciations> cleanedList = pronunciationsList.stream()
                    .map(pronunciation -> {
                        // Remove slashes if they exist in the `letter` field
                        if (pronunciation.getLetter() != null && pronunciation.getLetter().contains("/")) {
                            pronunciation.setLetter(pronunciation.getLetter().replace("/", ""));
                        }
                        // Remove slashes if they exist in the `pronunciation` field
                        if (pronunciation.getPronunciation() != null
                                && pronunciation.getPronunciation().contains("/")) {
                            pronunciation.setPronunciation(pronunciation.getPronunciation().replace("/", ""));
                        }
                        return pronunciation;
                    })
                    .collect(Collectors.toList());

            // Return the cleaned list as JSON in the response
            return ResponseEntity.ok(pronunciationsList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error processing JSON response");
        }
    }

    @PostMapping("/Endtest")
    public ResponseEntity<?> Endtest(@RequestBody TestEndRequest testEndRequest,
            @RequestHeader("Authorization") String jwt) {
        try {
            User user = userService.FindUserByJwt(jwt);
            User user1 = userService.UpdateExpereince(user.getEmail(), testEndRequest.getNoofCorrectAnswers() * 10);
            return ResponseEntity.ok().body(user1);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

package com.example.Language_Learning_App.Response;

import java.util.List;

import lombok.Data;

@Data
public class PassageQuestion {
    private String passage;
    private String question;
    private List<String> options;
    private String answer;
}

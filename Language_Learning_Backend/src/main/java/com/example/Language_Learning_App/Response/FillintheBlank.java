package com.example.Language_Learning_App.Response;

import java.util.List;

import lombok.Data;

@Data
public class FillintheBlank {
    private String question;
    private List<String> options;
    private String answer;
}

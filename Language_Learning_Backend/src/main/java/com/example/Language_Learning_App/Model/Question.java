package com.example.Language_Learning_App.Model;

import java.util.List;

import lombok.Data;

@Data
public class Question {
    private String questionId;
    private String questionText;
    private String correctAnswer;
    private List<String> options; 
}

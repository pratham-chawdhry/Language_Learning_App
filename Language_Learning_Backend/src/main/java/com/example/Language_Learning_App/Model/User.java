package com.example.Language_Learning_App.Model;

import java.util.List;

import lombok.Data;
@Data
public class User {
    private String username;
    private String email;
    private String password;  // Ideally hashed, but plain here for simplicity
    private int level;
    private int experiencePoints;
    private int totalCorrectAnswers;
    private int totalQuestionsAnswered;
    private int coins; // Can be used as an in-game currency
    private int streakCount; // For daily streaks
    private List<Language> learnedLanguages; // List of languages the user has learned or is learning
}

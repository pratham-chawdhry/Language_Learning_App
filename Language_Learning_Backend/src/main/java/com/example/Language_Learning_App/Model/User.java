package com.example.Language_Learning_App.Model;

import java.util.List;

import jakarta.persistence.Entity;
import lombok.Data;
@Data
@Entity
public class User {
    private String username;
    private String email;
    private String password;  
    private int level;
    private int experiencePoints;
    private int totalCorrectAnswers;
    private int totalQuestionsAnswered;
    private int coins;
    private int streakCount;
    private List<String> learnedLanguages;
    private boolean isActive;
    private UserProgress userProgress;
    private List<String> favoriteTopics;
    private String profilePictureUrl;
    private List<String> friends;
    private List<String>RevisedExercises;
}

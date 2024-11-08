package com.example.Language_Learning_App.Model;

import java.util.List;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;
@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String email;
    private String password;  
    private int level;
    private Long experiencePoints;
    private int totalCorrectAnswers;
    private int totalQuestionsAnswered;
    private int coins;
    private int streakCount;
    private List<String> learnedLanguages;
    private boolean isActive;
    @OneToOne(mappedBy = "user")
    private UserProgress userProgress;
    private USER_ROLE role;
}

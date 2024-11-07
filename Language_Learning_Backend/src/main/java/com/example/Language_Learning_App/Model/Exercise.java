package com.example.Language_Learning_App.Model;

import java.util.List;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private int level;  // The level associated with this exercise
    private List<Question> questions;  // List of questions in this exercise
    private boolean isUnlocked;  // If the exercise is unlocked or not
}

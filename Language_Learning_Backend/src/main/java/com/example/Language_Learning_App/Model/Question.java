package com.example.Language_Learning_App.Model;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Question {
    private String questionId;
    private String questionText;
    private String correctAnswer;
    @ElementCollection  
    @CollectionTable(name = "question_options", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "option_value")
    private List<String> options;  
    @ManyToOne //
    @JoinColumn(name = "exercise_id", nullable = false) 
    private Exercise exercise;  
}
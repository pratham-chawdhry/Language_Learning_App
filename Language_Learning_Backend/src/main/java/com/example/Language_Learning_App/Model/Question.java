package com.example.Language_Learning_App.Model;

import java.util.List;

import jakarta.annotation.Generated;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String questionText;
    private String correctAnswer;
    @ElementCollection  // Used to store a list of simple values (options in this case)
    @CollectionTable(name = "question_options", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "option_value")
    private List<String> options;  // List of answer options for the question
    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)  // Foreign key to associate with Exercise
    private Exercise exercise;  // The exercise to which this question belongs
}

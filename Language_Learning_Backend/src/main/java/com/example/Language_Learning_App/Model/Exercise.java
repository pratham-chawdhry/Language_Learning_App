package com.example.Language_Learning_App.Model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private int level;  // The level associated with this exercise
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "exercise")  // One exercise can have multiple questions
    private List<Question> questions;  // List of questions in this exercise
}
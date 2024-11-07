package com.example.Language_Learning_App.Model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_progress")  // Specify the table name explicitly
public class UserProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(name = "current_level", nullable = false)
    private int currentLevel;

    // Constructors, getters, setters, if needed
}

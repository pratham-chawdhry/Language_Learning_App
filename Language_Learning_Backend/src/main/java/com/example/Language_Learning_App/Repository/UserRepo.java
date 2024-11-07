package com.example.Language_Learning_App.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Language_Learning_App.Model.User;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);  
    User findByEmail(String email);
}

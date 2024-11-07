package com.example.Language_Learning_App.Response;

import com.example.Language_Learning_App.Model.USER_ROLE;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String message;
    private USER_ROLE role;
}

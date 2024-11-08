package com.example.Language_Learning_App.Request;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class TestEndRequest {
    @JsonProperty("NoofCorrectAnswers")
    private Long NoofCorrectAnswers;
}

package com.accolite.app.dto;

import lombok.Data;

import java.util.List;

@Data
public class CandidateDTO {
    private String email;
    List<QuestionDTO> questions;
}

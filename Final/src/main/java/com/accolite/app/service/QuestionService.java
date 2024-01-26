package com.accolite.app.service;

import com.accolite.app.dto.QuestionDTO;

import java.util.List;

public interface QuestionService {
    String saveQuestion(QuestionDTO questionDTO);

    List<QuestionDTO> getQuestions();
}

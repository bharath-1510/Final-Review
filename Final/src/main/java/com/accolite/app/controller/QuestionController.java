package com.accolite.app.controller;

import com.accolite.app.dto.QuestionDTO;
import com.accolite.app.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/question")
@CrossOrigin("http://localhost:4200")
public class QuestionController {
    @Autowired
    QuestionService questionService;

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveQuestion(@RequestBody QuestionDTO questionDTO) {
        String res = questionService.saveQuestion(questionDTO);
        Map<String, String> response = new HashMap<>();
        response.put("result", res);
        return ResponseEntity.ok(response);

    }
}

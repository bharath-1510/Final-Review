package com.accolite.app.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuestionDTO {
    private Long id;
    private String description;
    private Integer weightage;
    private Long compilationTimeout;
    private List<TemplateDTO> templates;
    private List<TestCaseDTO> testcases;
}

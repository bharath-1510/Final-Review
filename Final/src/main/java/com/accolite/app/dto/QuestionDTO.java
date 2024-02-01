package com.accolite.app.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuestionDTO {
    private Long id;
    private String title;
    private String description;
    private Integer weightage;
    private Long compilationTimeout;
    private String commands;
    private String query;
    private String type;
    private List<TemplateDTO> templates;
    private List<TestCaseDTO> testcases;
}

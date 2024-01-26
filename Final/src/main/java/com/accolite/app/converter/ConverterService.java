package com.accolite.app.converter;

import com.accolite.app.dto.QuestionDTO;
import com.accolite.app.dto.TemplateDTO;
import com.accolite.app.dto.TestCaseDTO;
import com.accolite.app.entity.Question;
import com.accolite.app.entity.Template;
import com.accolite.app.entity.TestCase;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConverterService {
    public Question convertQuestionToEntity(QuestionDTO questionDTO) {
        Question question= new Question();
        question.setDescription(questionDTO.getDescription());
        question.setWeightage(questionDTO.getWeightage());
        question.setCompilationTimeout(questionDTO.getCompilationTimeout());
        return question;
    }
    public List<TestCase> convertTestcasesToEntity(List<TestCaseDTO> testcases, Question question) {
        return testcases.stream()
                .map(dto -> {
                    TestCase testCase = new TestCase();
                    testCase.setInput(dto.getInput());
                    testCase.setOutput(dto.getOutput());
                    testCase.setQuestion(question);
                    return testCase;
                })
                .collect(Collectors.toList());
    }

    public List<Template> convertTemplatesToEntity(List<TemplateDTO> templates, Question question) {
        return templates.stream()
                .map(dto -> {
                    Template template = new Template();
                    template.setCode(dto.getCode());
                    template.setLanguage(dto.getLanguage());
                    template.setQuestion(question);
                    return template;
                })
                .collect(Collectors.toList());
    }
}

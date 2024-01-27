package com.accolite.app.serviceImpl;

import com.accolite.app.converter.ConverterService;
import com.accolite.app.dto.QuestionDTO;
import com.accolite.app.entity.Question;
import com.accolite.app.exception.ApiRequestException;
import com.accolite.app.repository.QuestionRepository;
import com.accolite.app.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
    private final ConverterService converterService;
    @Autowired
    QuestionRepository questionRepository;
    @Override
    public String saveQuestion(QuestionDTO questionDTO) {
        try {
            Question question = questionRepository.save(converterService.convertQuestionToEntity(questionDTO));
            question.setTemplates(converterService.convertTemplatesToEntity(questionDTO.getTemplates(),question));
            question.setTestCases(converterService.convertTestcasesToEntity(questionDTO.getTestcases(),question));
            questionRepository.save(question);
            return "Question Saved";
        }
        catch (DataIntegrityViolationException e){
            throw new ApiRequestException("Duplicate Entry",HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public List<QuestionDTO> getQuestions() {
        List<Question> questions = questionRepository.findAll();
        List<QuestionDTO> list = new ArrayList<>();
        questions.forEach(
                (x) -> {
                    list.add(converterService.convertQuestionToDTO(x));
                }
        );
        return list;
    }
}

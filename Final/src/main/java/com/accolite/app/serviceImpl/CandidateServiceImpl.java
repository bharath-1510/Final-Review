package com.accolite.app.serviceImpl;

import com.accolite.app.converter.ConverterService;
import com.accolite.app.dto.CandidateDTO;
import com.accolite.app.dto.QuestionDTO;
import com.accolite.app.entity.Candidate;
import com.accolite.app.entity.Question;
import com.accolite.app.exception.ApiRequestException;
import com.accolite.app.repository.CandidateRepository;
import com.accolite.app.service.CandidateService;
import com.accolite.app.util.UtilityService;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CandidateServiceImpl implements CandidateService {
    private final UtilityService utilityService;
    private final ConverterService converterService;
    @Autowired
    CandidateRepository candidateRepository;
    @Override
    public List<CandidateDTO> uploadData(MultipartFile file) {
        if (file.isEmpty()) {
            throw new ApiRequestException("File is Empty", HttpStatus.BAD_REQUEST);
        }
        try {
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            List<CandidateDTO> list = new ArrayList<>();
            Sheet sheet = workbook.getSheetAt(0);
            int rowCount = sheet.getPhysicalNumberOfRows();
            for (int i = 1; i < rowCount; i++) {
                Row row = sheet.getRow(i);
                CandidateDTO candidateDTO = new CandidateDTO();
                candidateDTO.setEmail(row.getCell(0).getStringCellValue());
                candidateDTO.setPassword(utilityService.hashPassword(candidateDTO.getEmail()));
                list.add(candidateDTO);
            }
            return list;
        } catch (IOException e) {
            throw new ApiRequestException("File Not Found", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public String assignQuestion(List<CandidateDTO> candidates) {
        try {
            List<Question> questions = new ArrayList<>();
            candidates.get(0).getQuestions().forEach(
                    x -> questions.add(converterService.convertQuestionToEntity(x))
            );
            candidates.forEach(
                    candidateDTO -> {

                        candidateRepository.save(converterService.convertCandidateToEntity(candidateDTO, questions));
                    }
            );
            return "Questions Assigned";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }
}

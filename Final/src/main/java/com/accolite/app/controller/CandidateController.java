package com.accolite.app.controller;

import com.accolite.app.dto.CandidateDTO;
import com.accolite.app.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/candidate")
@CrossOrigin("http://localhost:4200")
public class CandidateController {
    @Autowired
    CandidateService candidateService;

    @PostMapping("/upload")
    public List<CandidateDTO> uploadData(@RequestParam("file") MultipartFile file) {
        return candidateService.uploadData(file);
    }
    @PostMapping("/assign")
    public ResponseEntity<Map<String, String>> assignTest(@RequestBody List<CandidateDTO> candidates) {
        System.out.println(candidates);
        Map<String, String> response = new HashMap<>();
        response.put("result", candidateService.assignQuestion(candidates));
        return ResponseEntity.ok(response);
    }
}

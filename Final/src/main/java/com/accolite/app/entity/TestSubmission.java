package com.accolite.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TestSubmission {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private Long candidateId;
    private Long questionId;
    @Column(columnDefinition = "LONGTEXT")
    private String code;
    private boolean submitStatus;
    @OneToMany(mappedBy = "testSubmission", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<TestCaseOutput> testCaseOutputs;
}

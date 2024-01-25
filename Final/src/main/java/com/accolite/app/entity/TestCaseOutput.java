package com.accolite.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TestCaseOutput {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(columnDefinition = "LONGTEXT")
    private String actualOutput;
    @Column(columnDefinition = "LONGTEXT")
    private String expectedOutput;
    private Boolean exitValue ;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_submission_id", nullable = false)
    @JsonIgnore
    private TestSubmission testSubmission;
}

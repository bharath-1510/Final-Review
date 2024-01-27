package com.accolite.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor

@Entity

public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String title;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private Integer weightage;
    private Long compilationTimeout;
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<TestCase> testCases;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Template> templates;

    @ManyToMany(mappedBy = "questions")
    List<Candidate> candidates = new ArrayList<>();

}

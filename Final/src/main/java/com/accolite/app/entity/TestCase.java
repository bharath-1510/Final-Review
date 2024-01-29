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
@Table(name = "testcase")
public class TestCase {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long testcaseId;

    @Column(columnDefinition = "LONGTEXT")
    private String input;
    @Column(columnDefinition = "LONGTEXT")
    private String output;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    @JsonIgnore
    private Question question;

}


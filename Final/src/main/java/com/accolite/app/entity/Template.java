package com.accolite.app.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "template")
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long templateId;


    @Column(columnDefinition = "LONGTEXT")
    private String code;


    private String language;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "questionId")
    @JsonIgnore
    private Question question;


}

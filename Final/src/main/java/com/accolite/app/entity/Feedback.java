package com.accolite.app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Feedback {
    @Id
    private Long id;
    @Column(columnDefinition = "LONGTEXT")
    private String description;
    private Integer rating;
}

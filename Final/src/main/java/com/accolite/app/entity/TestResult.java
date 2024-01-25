package com.accolite.app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TestResult {
    @Id
    private Long id;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer score;
    private Integer status;
}

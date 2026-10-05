package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Todo {

  @Id
  private Long id;

  private String title;
  private String description;

  private Boolean completed;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}

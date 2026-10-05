package com.example.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;

@Data
public class TodoRequestDTO {

  @Positive
  private Long id;

  @NotBlank(message = "Title is required")
  @Size(max = 200, message = "Title must not exceed 200 characters")
  private String title;

  @Size(max = 1000, message = "Description must not exceed 1000 characters")
  private String description;

  private Boolean completed;
}

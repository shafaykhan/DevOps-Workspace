package com.example.backend.controller;

import com.example.backend.dto.TodoRequestDTO;
import com.example.backend.dto.TodoResponseDTO;
import com.example.backend.service.TodoService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/todos")
@AllArgsConstructor
public class TodoController {

  private final TodoService service;

  @PostMapping
  public ResponseEntity<TodoResponseDTO> save(@Valid @RequestBody TodoRequestDTO dto) {
    log.debug("POST /api/todos Payload: {}", dto);
    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(service.save(dto));
  }

  @PutMapping()
  public ResponseEntity<TodoResponseDTO> update(@Valid @RequestBody TodoRequestDTO dto) {
    log.debug("PUT /api/todos Payload: {}", dto);
    return ResponseEntity.ok(service.update(dto));
  }

  @GetMapping
  public ResponseEntity<List<TodoResponseDTO>> findAll() {
    log.info("GET /api/todos");
    return ResponseEntity.ok(service.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<TodoResponseDTO> findById(@PathVariable Long id) {
    log.info("GET /api/todos/{}", id);
    return ResponseEntity.ok(service.findById(id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteById(@PathVariable Long id) {
    log.info("DELETE /api/todos/{}", id);
    service.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}

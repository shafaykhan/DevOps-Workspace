package com.example.backend.service;

import com.example.backend.dto.TodoRequestDTO;
import com.example.backend.dto.TodoResponseDTO;
import com.example.backend.entity.Todo;
import com.example.backend.exception.TodoNotFoundException;
import com.example.backend.repository.TodoRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class TodoService {

  private final TodoRepository repository;
  private final ModelMapper modelMapper;

  public TodoResponseDTO save(TodoRequestDTO request) {
    Todo todo = modelMapper.map(request, Todo.class);
    todo.setId(null);

    LocalDateTime now = LocalDateTime.now();
    todo.setCreatedAt(now);
    todo.setUpdatedAt(now);

    if (todo.getCompleted() == null) {
      todo.setCompleted(false);
    }

    Todo savedTodo = repository.save(todo);
    return modelMapper.map(savedTodo, TodoResponseDTO.class);
  }

  public TodoResponseDTO update(TodoRequestDTO request) {
    Todo existingTodo = findEntityById(request.getId());

    existingTodo.setTitle(request.getTitle());
    existingTodo.setDescription(request.getDescription());
    existingTodo.setCompleted(request.getCompleted());
    existingTodo.setUpdatedAt(LocalDateTime.now());

    Todo updatedTodo = repository.save(existingTodo);
    return modelMapper.map(updatedTodo, TodoResponseDTO.class);
  }

  public List<TodoResponseDTO> findAll() {
    return repository.findAll().stream()
            .map(todo -> modelMapper.map(todo, TodoResponseDTO.class))
            .toList();
  }

  public TodoResponseDTO findById(Long id) {
    Todo todo = findEntityById(id);
    return modelMapper.map(todo, TodoResponseDTO.class);
  }

  public void deleteById(Long id) {
    Todo todo = findEntityById(id);
    repository.delete(todo);
  }

  private Todo findEntityById(Long id) {
    return repository.findById(id)
            .orElseThrow(TodoNotFoundException::new);
  }
}

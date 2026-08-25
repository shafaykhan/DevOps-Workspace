package com.example.spring;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.net.InetAddress;
import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@RestController
public class HelloController {

  private final String env = System.getenv().getOrDefault("ENV_VALUE", "No env set");

  private String hostname() throws Exception {
    return InetAddress.getLocalHost().getHostName();
  }

  @GetMapping("/")
  public Map<String, String> hello() throws Exception {
    log.info("Home API called");
    return Map.of("message", "Hello from Simple App (Spring Boot)", "env", env, "container", hostname());
  }

  @GetMapping("/health")
  public Map<String, Object> health() {
    log.info("Health API called");
    return Map.of("status", "UP", "timestamp", LocalDateTime.now().toString());
  }

  @GetMapping("/info")
  public Map<String, Object> info() throws Exception {
    log.info("Info API called");
    return Map.of("hostname", hostname(), "environment", env, "javaVersion",
            System.getProperty("java.version"), "os", System.getProperty("os.name"));
  }

  @GetMapping("/greet/{name}")
  public Map<String, String> greet(@PathVariable String name) {
    log.info("Greeting requested for: {}", name);
    return Map.of("message", "Hello, " + name + "!");
  }
}

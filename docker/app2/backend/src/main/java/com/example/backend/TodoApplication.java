package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

import java.net.InetAddress;
import java.net.UnknownHostException;

@SpringBootApplication
public class TodoApplication {

  public static void main(String[] args) throws UnknownHostException {
    var context = SpringApplication.run(TodoApplication.class, args);

    Environment env = context.getEnvironment();
    String port = env.getProperty("server.port", "9000");
    String environment = System.getenv().getOrDefault("ENV_VALUE", "No env set");
    String hostname = InetAddress.getLocalHost().getHostName();
    String[] profiles = env.getActiveProfiles();

    String activeProfile = profiles.length > 0 ? String.join(", ", profiles) : "default";

    System.out.println();
    System.out.println("==============================================");
    System.out.println("🚀 Spring Boot Application Started");
    System.out.println("==============================================");
    System.out.println("🌍 Environment : " + environment);
    System.out.println("📦 Container   : " + hostname);
    System.out.println("🔌 Port        : " + port);
    System.out.println("🌐 URL         : http://localhost:" + port);
    System.out.println("⚙️ Profile     : " + activeProfile);
    System.out.println("==============================================");
    System.out.println();
  }
}

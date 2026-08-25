package com.example.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.InetAddress;

@SpringBootApplication
public class DemoApplication {

  public static void main(String[] args) throws Exception {
    SpringApplication.run(DemoApplication.class, args);

    System.out.println("=================================");
    System.out.println("🚀 Spring Boot Application Started");
    System.out.println("🌍 Environment : " + System.getenv().getOrDefault("ENV_VALUE", "No env set"));
    System.out.println("📦 Container   : " + InetAddress.getLocalHost().getHostName());
    System.out.println("=================================");
  }

}

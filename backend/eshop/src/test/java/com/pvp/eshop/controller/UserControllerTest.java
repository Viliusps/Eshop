package com.pvp.eshop.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.pvp.eshop.model.Role;
import com.pvp.eshop.model.User;
import com.pvp.eshop.repository.UserRepository;
import com.pvp.eshop.testutils.DatabaseTestDataCleaner;
import com.pvp.eshop.testutils.IntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import java.util.List;

@IntegrationTest
public class UserControllerTest {
    @Autowired TestRestTemplate restTemplate;
    @Autowired DatabaseTestDataCleaner databaseTestDataCleaner;
    @Autowired UserRepository userRepository;

    @BeforeEach
    public void init() {
        databaseTestDataCleaner.cleanUpTestData();
    }

    @Test
    public void getAllUsers_shouldReturnAllUsers() {
        var users = List.of(
                User.builder()
                    .username("TestUsername")
                    .email("TestEmail@gmail.com")
                    .password("TestPassword")
                    .phone("TestPhone")
                    .role(Role.ADMIN)
                    .build(),
                User.builder()
                    .username("TestUsername1")
                    .email("TestEmail1@gmail.com")
                    .password("TestPassword1")
                    .phone("TestPhone1")
                    .role(Role.USER)
                    .build());
        userRepository.saveAll(users);

        var response = restTemplate.getForEntity("/api/v1/users", User[].class);
        var object = response.getBody();

        assertThat(object).isNotNull();
        assertThat(object.length).isEqualTo(2);
        assertThat(object[0].getUsername()).isEqualTo(users.get(0).getUsername());
        assertThat(object[1].getUsername()).isEqualTo(users.get(1).getUsername());
    }

    @Test
    public void getAllUsers_shouldReturnOkStatus() {
        var users = List.of(
                User.builder()
                        .username("TestUsername")
                        .email("TestEmail@gmail.com")
                        .password("TestPassword")
                        .phone("TestPhone")
                        .role(Role.ADMIN)
                        .build(),
                User.builder()
                        .username("TestUsername1")
                        .email("TestEmail1@gmail.com")
                        .password("TestPassword1")
                        .phone("TestPhone1")
                        .role(Role.USER)
                        .build());
        userRepository.saveAll(users);

        var response = restTemplate.getForEntity("/api/v1/users", User[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getUserById_whenUserExists_shouldReturnUser() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var response = restTemplate.getForEntity("/api/v1/users/"+userResponse.getId(), User.class);
        var object = response.getBody();

        assertThat(object).isNotNull();
        assertThat(object.getUsername()).isEqualTo(user.getUsername());
    }

    @Test
    public void getUserById_whenUserExists_shouldReturnOkStatus() {
        var user = User.builder()
                        .username("TestUsername")
                        .email("TestEmail@gmail.com")
                        .password("TestPassword")
                        .phone("TestPhone")
                        .role(Role.ADMIN)
                        .build();
        var userResponse = userRepository.save(user);

        var response = restTemplate.getForEntity("/api/v1/users/"+userResponse.getId(), User.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getUserById_whenUserDoesNotExist_shouldReturnNotFoundStatus() {
        var response = restTemplate.getForEntity("/api/v1/users/1", User[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    public void createUser_shouldCreateUser() {
        var request = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .build();

        restTemplate.postForEntity("/api/v1/users", request, User.class);

        var response = userRepository.findAll();

        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getUsername()).isEqualTo("TestUsername");
    }

    @Test
    public void createUser_shouldReturnCreatedStatus() {
        var request = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .build();

        var response = restTemplate.postForEntity("/api/v1/users", request, User.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    public void updateUser_whenUserExists_shouldUpdateUser() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var request = User.builder()
                .username("ChangedUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();

        restTemplate.put("/api/v1/users/" + userResponse.getId(), request);

        var response = userRepository.findAll();

        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getUsername()).isEqualTo("ChangedUsername");
    }

    @Test
    public void updateUser_whenUserExists_shouldReturnOkStatus() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var request = User.builder()
                .username("ChangedUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<User> entity = new HttpEntity<>(request, headers);

        var response = restTemplate.exchange("/api/v1/users/" + userResponse.getId(), HttpMethod.PUT, entity, User.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void updateUser_whenUserExists_shouldReturnNotFoundStatus() {
        var request = User.builder()
                .username("ChangedUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<User> entity = new HttpEntity<>(request, headers);

        var response = restTemplate.exchange("/api/v1/users/1", HttpMethod.PUT, entity, User.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    public void adminUpdateUser_whenUserExists_shouldUpdateUser() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var request = User.builder()
                .username("ChangedUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();

        restTemplate.put("/api/v1/users/admin/" + userResponse.getId(), request);

        var response = userRepository.findAll();

        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getUsername()).isEqualTo("ChangedUsername");
    }

    @Test
    public void adminUpdateUser_whenUserExists_shouldReturnOkStatus() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var request = User.builder()
                .username("ChangedUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<User> entity = new HttpEntity<>(request, headers);

        var response = restTemplate.exchange("/api/v1/users/admin/" + userResponse.getId(), HttpMethod.PUT, entity, User.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void adminUpdateUser_whenUserExists_shouldReturnNotFoundStatus() {
        var request = User.builder()
                .username("ChangedUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<User> entity = new HttpEntity<>(request, headers);

        var response = restTemplate.exchange("/api/v1/users/admin/1", HttpMethod.PUT, entity, User.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    public void deleteUser_whenUserExists_shouldDeleteUser() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        restTemplate.delete("/api/v1/users/"+userResponse.getId());

        var response = userRepository.findAll();

        assertThat(response).isEmpty();
    }

    @Test
    public void deleteUser_whenUserExists_shouldReturnNoContentStatus() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var response = restTemplate.exchange("/api/v1/users/" + userResponse.getId(), HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }

    @Test
    public void deleteUser_whenDoesNotExist_shouldReturnNotFoundStatus() {
        var response = restTemplate.exchange("/api/v1/users/1", HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}

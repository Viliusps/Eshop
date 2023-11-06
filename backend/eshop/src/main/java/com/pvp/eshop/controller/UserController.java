package com.pvp.eshop.controller;

import java.util.List;
import java.util.Objects;

import com.pvp.eshop.auth.AuthenticationService;
import com.pvp.eshop.config.Generated;
import com.pvp.eshop.model.User;
import com.pvp.eshop.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    UserService userService;

    private final AuthenticationService authService;

    public UserController(UserService userService, AuthenticationService authService) {
        this.authService = authService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
        if (userService.existsUser(id)) {
            return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        return new ResponseEntity<>(userService.createUser(user), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") long id, @Valid @RequestBody User user) {
        if (userService.existsUser(id)) {
            return new ResponseEntity<>(userService.updateUser(id, user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<User> adminUpdateUser(@PathVariable("id") long id, @Valid @RequestBody User user) {
        if (userService.existsUser(id)) {
            return new ResponseEntity<>(userService.adminUpdateUser(id, user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
        if (userService.existsUser(id)) {
            userService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Generated
    @PostMapping("/decode")
    public ResponseEntity<String> decode(
        @RequestBody String request
    ) {
        if (Objects.equals(request, "")) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        String role = authService.extractRole(request);
        return ResponseEntity.ok(role);
    }

    @Generated
    @PostMapping("/getId")
    public ResponseEntity<String> decodeId(
            @RequestBody String request
    ) {
        if (Objects.equals(request, "")) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        String id = authService.extractId(request);
        return ResponseEntity.ok(id);
    }
}

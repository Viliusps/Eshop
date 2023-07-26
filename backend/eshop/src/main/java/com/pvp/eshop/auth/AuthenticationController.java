package com.pvp.eshop.auth;

import java.util.NoSuchElementException;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<Boolean> register(
        @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
        @RequestBody AuthenticationRequest request
    ) {
        try {
            return ResponseEntity.ok(service.authenticate(request));
        } catch (IllegalAccessException e) {
            return new ResponseEntity<>(new AuthenticationResponse(), HttpStatus.UNAUTHORIZED);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(new AuthenticationResponse(), HttpStatus.NOT_FOUND);
        }

    }
    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refreshToken(
        @RequestBody AuthenticationRequest request
    ) {
        try {
            return ResponseEntity.ok(service.refreshToken(request));
        } catch (IllegalAccessException e) {
            return new ResponseEntity<>(new AuthenticationResponse(), HttpStatus.UNAUTHORIZED);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(new AuthenticationResponse(), HttpStatus.NOT_FOUND);
        }

    }
}
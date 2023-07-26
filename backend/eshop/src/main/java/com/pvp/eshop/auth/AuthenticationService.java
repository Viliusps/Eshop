package com.pvp.eshop.auth;

import java.util.Optional;

import com.pvp.eshop.config.JwtService;
import com.pvp.eshop.model.Role;
import com.pvp.eshop.model.User;
import com.pvp.eshop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public boolean register(RegisterRequest request) {
        var user = User.builder()
            .username(request.getUsername())
            .email(request.getEmail())
            .phone(request.getPhone())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.USER)
            .build();
        Optional<User> temp = repository.userByUsername(user.getUsername());
        if (temp.isPresent()) {
            return false;
        }
        repository.save(user);
        return true;
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws IllegalAccessException {
        var user = repository.userByUsername(request.getUsername())
                .orElseThrow();

        if (user.getRole() == Role.BLOCKED) {
            throw new IllegalAccessException();
        }

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();
    }

    public AuthenticationResponse refreshToken(AuthenticationRequest request) throws IllegalAccessException {
        var user = repository.userByUsername(request.getUsername())
                .orElseThrow();

        if (user.getRole() == Role.BLOCKED) {
            throw new IllegalAccessException();
        }

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();
    }


    public String extractRole(String request) {
        return jwtService.extractRole(request);
    }

    public String extractId(String request) {
        return jwtService.extractId(request);
    }
}
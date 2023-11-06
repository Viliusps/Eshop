package com.pvp.eshop.controller;

import com.pvp.eshop.auth.AuthenticationService;
import com.pvp.eshop.model.Role;
import com.pvp.eshop.model.User;
import com.pvp.eshop.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private AuthenticationService authService;

    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        userController = new UserController(userService, authService);
    }

    @Test
    public void getAllUsers_shouldReturnAllUsers() {
        // Mock the UserService to return a list of users
        when(userService.getAllUsers()).thenReturn(List.of(new User(), new User()));

        ResponseEntity<List<User>> response = userController.getAllUsers();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(2, response.getBody().size());
    }

    @Test
    public void getUserByIdExists_shouldReturnUserByIdIfExists() {
        long userId = 1L;
        User user = new User();
        when(userService.existsUser(userId)).thenReturn(true);
        when(userService.getUserById(userId)).thenReturn(user);

        ResponseEntity<User> response = userController.getUserById(userId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    public void getUserById_shouldReturnNotFoundForUserByIdIfNotExists() {
        long userId = 1L;
        when(userService.existsUser(userId)).thenReturn(false);

        ResponseEntity<User> response = userController.getUserById(userId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void createUser_shouldCreateUser() {
        User newUser = new User();
        when(userService.createUser(newUser)).thenReturn(newUser);

        ResponseEntity<User> response = userController.createUser(newUser);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(newUser, response.getBody());
    }

    @Test
    public void updateUser_shouldUpdateUserIfExists() {
        long userId = 1L;
        User updatedUser = new User();
        when(userService.existsUser(userId)).thenReturn(true);
        when(userService.updateUser(userId, updatedUser)).thenReturn(updatedUser);

        ResponseEntity<User> response = userController.updateUser(userId, updatedUser);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedUser, response.getBody());
    }

    @Test
    public void updateUser_shouldReturnNotFoundForUpdateUserIfNotExists() {
        long userId = 1L;
        when(userService.existsUser(userId)).thenReturn(false);

        ResponseEntity<User> response = userController.updateUser(userId, new User());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void adminUpdateUser_shouldAdminUpdateUserIfExists() {
        long userId = 1L;
        User updatedUser = new User();
        when(userService.existsUser(userId)).thenReturn(true);
        when(userService.adminUpdateUser(userId, updatedUser)).thenReturn(updatedUser);

        ResponseEntity<User> response = userController.adminUpdateUser(userId, updatedUser);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedUser, response.getBody());
    }

    @Test
    public void adminUpdateUser_shouldReturnNotFoundForAdminUpdateUserIfNotExists() {
        long userId = 1L;
        when(userService.existsUser(userId)).thenReturn(false);

        ResponseEntity<User> response = userController.adminUpdateUser(userId, new User());

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void deleteUser_shouldDeleteUserIfExists() {
        long userId = 1L;
        when(userService.existsUser(userId)).thenReturn(true);

        ResponseEntity<HttpStatus> response = userController.deleteUser(userId);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(userService, times(1)).deleteUser(userId);
    }

    @Test
    public void deleteUser_shouldReturnNotFoundForDeleteUserIfNotExists() {
        long userId = 1L;
        when(userService.existsUser(userId)).thenReturn(false);

        ResponseEntity<HttpStatus> response = userController.deleteUser(userId);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(userService, never()).deleteUser(userId);
    }
}

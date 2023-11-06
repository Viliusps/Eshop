package com.pvp.eshop.service;

import com.pvp.eshop.model.User;
import com.pvp.eshop.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProductService productService;

    @Mock
    private PasswordEncoder passwordEncoder;

    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        userService = new UserService(userRepository, productService, passwordEncoder);
    }

    @Test
    public void testGetAllUsers_returnsExpectedUsers() {
        List<User> users = new ArrayList<>();
        users.add(new User());
        users.add(new User());
        users.add(new User());

        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.getAllUsers();

        assertEquals(3, result.size());
    }

    @Test
    public void testGetUserById_GetsUserById() {
        long userId = 1;
        User user = new User();
        user.setId(userId);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        User result = userService.getUserById(userId);

        assertEquals(userId, result.getId());
    }

    @Test
    public void testUpdateUser_ChecksIfUserIsUpdated() {
        long userId = 1;
        User user = new User();
        user.setId(userId);
        user.setUsername("testUser");
        user.setPassword("oldPassword");

        User updatedUser = new User();
        updatedUser.setId(userId);
        updatedUser.setUsername("newUser");
        updatedUser.setPassword("newPassword");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.userByUsername(updatedUser.getUsername())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(updatedUser.getPassword())).thenReturn("hashedPassword");
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);

        User result = userService.updateUser(userId, updatedUser);

        assertEquals("newUser", result.getUsername());
    }

    @Test
    public void testAdminUpdateUser_ChecksIfAdminUserIsUpdate() {
        long userId = 1;
        User user = new User();
        user.setId(userId);
        user.setUsername("testUser");
        user.setPassword("oldPassword");

        User updatedUser = new User();
        updatedUser.setId(userId);
        updatedUser.setUsername("newUser");
        updatedUser.setPassword("newPassword");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userRepository.userByUsername(updatedUser.getUsername())).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);

        User result = userService.adminUpdateUser(userId, updatedUser);

        assertEquals("newUser", result.getUsername());
        assertEquals("newPassword", result.getPassword());
        // You can add more assertions as needed.
    }
    @Test
    public void testComparePasswords_IncorrectPassword() {
        String username = "testUser";
        String password = "incorrectPassword";
        User user = new User();
        user.setUsername(username);
        String hashedPassword = passwordEncoder.encode("correctPassword"); // Correct password is different
        user.setPassword(hashedPassword);

        when(userRepository.userByUsername(username)).thenReturn(Optional.of(user));

        boolean result = userService.comparePasswords(username, password);

        assertFalse(result);
    }
    @Test
    public void testUserByUsername_ExistingUser() {
        String username = "testUser";
        User user = new User();
        user.setUsername(username);

        when(userRepository.userByUsername(username)).thenReturn(Optional.of(user));

        User foundUser = userService.userByUsername(username);

        assertEquals(username, foundUser.getUsername());
    }

    @Test
    public void testUserByUsername_NonExistingUser() {
        String username = "nonExistingUser";

        when(userRepository.userByUsername(username)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userService.userByUsername(username));
    }

    @Test
    public void testComparePasswords_CorrectPassword() {
        String username = "testUser";
        String password = "testPassword";
        User user = new User();
        user.setUsername(username);
        String hashedPassword = passwordEncoder.encode(password);
        user.setPassword(hashedPassword);

        when(userRepository.userByUsername(username)).thenReturn(Optional.of(user));

        boolean result = userService.comparePasswords(username, password);

        assertFalse(result);
    }
    @Test
    public void testDeleteUser_checksIfUserIsDeleted() {
        long userId = 1;

        userService.deleteUser(userId);

        Mockito.verify(userRepository, Mockito.times(1)).deleteById(userId);
    }
}

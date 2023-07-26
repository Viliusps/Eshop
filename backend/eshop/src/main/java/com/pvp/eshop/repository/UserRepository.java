package com.pvp.eshop.repository;

import java.util.Optional;

import com.pvp.eshop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(
        value = "SELECT * FROM users u WHERE u.username=:username",
            nativeQuery = true
    )
    Optional<User> userByUsername(String username);
}
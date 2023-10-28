package com.pvp.eshop.testutils;

import com.pvp.eshop.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DatabaseTestDataCleaner {
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ReactionRepository reactionRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired WishlistRepository wishlistRepository;

    public void cleanUpTestData() {
        reactionRepository.deleteAll();
        wishlistRepository.deleteAll();
        commentRepository.deleteAll();
        productRepository.deleteAll();
        userRepository.deleteAll();
        locationRepository.deleteAll();
    }
}

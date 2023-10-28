package com.pvp.eshop.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.pvp.eshop.model.Comment;
import com.pvp.eshop.model.Product;
import com.pvp.eshop.model.Role;
import com.pvp.eshop.model.User;
import com.pvp.eshop.model.enums.ProductCategory;
import com.pvp.eshop.repository.ProductRepository;
import com.pvp.eshop.repository.UserRepository;
import com.pvp.eshop.testutils.DatabaseTestDataCleaner;
import com.pvp.eshop.testutils.IntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;

import java.time.Instant;
import java.util.Date;

@IntegrationTest
public class CommentsControllerIT {
    @Autowired CommentsController commentsController;

    @Autowired TestRestTemplate restTemplate;

    @Autowired
    DatabaseTestDataCleaner databaseTestDataCleaner;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @BeforeEach
    void setup() {
        databaseTestDataCleaner.cleanUpTestData();
    }

    @Test
    void postComment_whenCommentIsPosted_shouldCorrectlyAddToDatabase() {
        var user = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse = userRepository.save(user);

        var product = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var request = Comment.builder().text("TestText").user_id(1L).product_id(1L).date(new Date()).user_id(userResponse.getId()).product_id(productResponse.getId()).build();

        var response = restTemplate.postForEntity("/api/v1/comments", request, Comment.class);

        var object = response.getBody();
        assertThat(object).isNotNull();
        assertThat(object.getText()).isEqualTo("TestText");
    }
}

package com.pvp.eshop.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.pvp.eshop.model.Comment;
import com.pvp.eshop.model.Product;
import com.pvp.eshop.model.Role;
import com.pvp.eshop.model.User;
import com.pvp.eshop.model.enums.ProductCategory;
import com.pvp.eshop.repository.CommentRepository;
import com.pvp.eshop.repository.ProductRepository;
import com.pvp.eshop.repository.UserRepository;
import com.pvp.eshop.testutils.DatabaseTestDataCleaner;
import com.pvp.eshop.testutils.IntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@IntegrationTest
public class CommentsControllerTest {
    @Autowired TestRestTemplate restTemplate;
    @Autowired DatabaseTestDataCleaner databaseTestDataCleaner;
    @Autowired CommentsController commentsController;
    @Autowired UserRepository userRepository;
    @Autowired ProductRepository productRepository;
    @Autowired CommentRepository commentRepository;

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

    @Test
    void postComment_whenCommentIsPosted_shouldReturnCreatedStatus() {
        var user = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse = userRepository.save(user);

        var product = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var request = Comment.builder().text("TestText").user_id(1L).product_id(1L).date(new Date()).user_id(userResponse.getId()).product_id(productResponse.getId()).build();

        var response = restTemplate.postForEntity("/api/v1/comments", request, Comment.class);

        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    void getCommentsByProduct_whenCorrectProductIdIsGiven_shouldReturnProductComments() {
        var user = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse = userRepository.save(user);

        var product1 = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse1 = productRepository.save(product1);

        var product2 = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse2 = productRepository.save(product2);

        var comments = List.of(
                Comment.builder().date(new Date(3)).user_id(user.getId()).product_id(productResponse1.getId()).text("First comment").build(),
                Comment.builder().date(new Date(2)).user_id(user.getId()).product_id(productResponse1.getId()).text("Second comment").build(),
                Comment.builder().date(new Date(1)).user_id(user.getId()).product_id(productResponse2.getId()).text("First comment").build()
        );
        commentRepository.saveAll(comments);

        var response = restTemplate.getForEntity("/api/v1/comments/byProduct/" + productResponse1.getId(), Comment[].class);
        var object = response.getBody();

        assertThat(object).isNotNull();
        assertThat(object.length).isEqualTo(2);
        assertThat(object[0].getText()).isEqualTo("First comment");
        assertThat(object[1].getText()).isEqualTo("Second comment");
    }

    @Test
    void getCommentsByProduct_whenCorrectProductIdIsGiven_shouldReturnOkStatus() {
        var user = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse = userRepository.save(user);

        var product1 = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse1 = productRepository.save(product1);

        var product2 = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse2 = productRepository.save(product2);

        var comments = List.of(
                Comment.builder().date(new Date(3)).user_id(user.getId()).product_id(productResponse1.getId()).text("First comment").build(),
                Comment.builder().date(new Date(2)).user_id(user.getId()).product_id(productResponse1.getId()).text("Second comment").build(),
                Comment.builder().date(new Date(1)).user_id(user.getId()).product_id(productResponse2.getId()).text("First comment").build()
        );
        commentRepository.saveAll(comments);

        var response = restTemplate.getForEntity("/api/v1/comments/byProduct/" + productResponse1.getId(), Comment[].class);

        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}

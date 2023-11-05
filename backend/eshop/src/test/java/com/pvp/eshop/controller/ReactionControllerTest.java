package com.pvp.eshop.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.pvp.eshop.model.*;
import com.pvp.eshop.model.enums.ProductCategory;
import com.pvp.eshop.repository.CommentRepository;
import com.pvp.eshop.repository.ProductRepository;
import com.pvp.eshop.repository.ReactionRepository;
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
import java.util.HashMap;

@IntegrationTest
public class ReactionControllerTest {
    @Autowired TestRestTemplate restTemplate;
    @Autowired DatabaseTestDataCleaner databaseTestDataCleaner;
    @Autowired UserRepository userRepository;
    @Autowired ProductRepository productRepository;
    @Autowired CommentRepository commentRepository;
    @Autowired ReactionRepository reactionRepository;

    @BeforeEach
    public void init() {
        databaseTestDataCleaner.cleanUpTestData();
    }

    @Test
    void likeOrDislikeComment_whenNewReactionIsPresent_shouldAddToDatabase() {
        var user = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse = userRepository.save(user);

        var product = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var comment = Comment.builder().date(new Date(3)).user_id(user.getId()).product_id(productResponse.getId()).text("First comment").build();
        var commentResponse = commentRepository.save(comment);

        var request = Reaction.builder().comment_id(commentResponse.getId()).user_id(userResponse.getId()).status(ReactionState.LIKE).build();

        restTemplate.postForEntity("/api/v1/reactions/likes", request, Reaction.class);

        var response = reactionRepository.findAll();

        assertThat(response).isNotNull();
        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getStatus()).isEqualTo(ReactionState.LIKE);
    }

    @Test
    void likeOrDislikeComment_whenOldReactionIsPresent_shouldDeleteOldFromDatabase() {
        var user = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse = userRepository.save(user);

        var product = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var comment = Comment.builder().date(new Date(3)).user_id(user.getId()).product_id(productResponse.getId()).text("First comment").build();
        var commentResponse = commentRepository.save(comment);

        var request = Reaction.builder().comment_id(commentResponse.getId()).user_id(userResponse.getId()).status(ReactionState.LIKE).build();
        reactionRepository.save(request);
        restTemplate.postForEntity("/api/v1/reactions/likes", request, Reaction.class);

        var response = reactionRepository.findAll();

        assertThat(response).isEmpty();
    }

    @Test
    void likeOrDislikeComment_whenMethodIsExecuted_shouldReturnCreatedStatus() {
        var user = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse = userRepository.save(user);

        var product = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var comment = Comment.builder().date(new Date(3)).user_id(user.getId()).product_id(productResponse.getId()).text("First comment").build();
        var commentResponse = commentRepository.save(comment);

        var request = Reaction.builder().comment_id(commentResponse.getId()).user_id(userResponse.getId()).status(ReactionState.LIKE).build();
        reactionRepository.save(request);
        var response = restTemplate.postForEntity("/api/v1/reactions/likes", request, Reaction.class);

        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    void getCommentsLikedOrDislikedByUser_whenReactionsArePresent_shouldReturnThemByUser() {
        var user = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse = userRepository.save(user);

        var product = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var comment = Comment.builder().date(new Date(3)).user_id(user.getId()).product_id(productResponse.getId()).text("First comment").build();
        var commentResponse = commentRepository.save(comment);

        var reaction = Reaction.builder().comment_id(commentResponse.getId()).user_id(userResponse.getId()).status(ReactionState.LIKE).build();
        reactionRepository.save(reaction);

        var request = new HashMap<String, Object>();
        request.put("user_id", userResponse.getId());
        request.put("product_id", productResponse.getId());
        request.put("status", ReactionState.LIKE);

        var response = restTemplate.postForEntity("/api/v1/reactions/likedByUser", request, Integer[].class);
        var object = response.getBody();

        assertThat(object).isNotNull();
        assertThat(object.length).isEqualTo(1);
        assertThat(object[0]).isEqualTo(commentResponse.getId());
    }

    @Test
    void getCommentsLikedOrDislikedByUser_whenReactionsArePresent_shouldReturnOkStatus() {
        var user = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse = userRepository.save(user);

        var product = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var comment = Comment.builder().date(new Date(3)).user_id(user.getId()).product_id(productResponse.getId()).text("First comment").build();
        var commentResponse = commentRepository.save(comment);

        var reaction = Reaction.builder().comment_id(commentResponse.getId()).user_id(userResponse.getId()).status(ReactionState.LIKE).build();
        reactionRepository.save(reaction);

        var request = new HashMap<String, Object>();
        request.put("user_id", userResponse.getId());
        request.put("product_id", productResponse.getId());
        request.put("status", ReactionState.LIKE);

        var response = restTemplate.postForEntity("/api/v1/reactions/likedByUser", request, Integer[].class);

        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}

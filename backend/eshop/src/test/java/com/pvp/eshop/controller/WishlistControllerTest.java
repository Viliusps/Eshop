package com.pvp.eshop.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.pvp.eshop.model.*;
import com.pvp.eshop.model.enums.ProductCategory;
import com.pvp.eshop.repository.ProductRepository;
import com.pvp.eshop.repository.UserRepository;
import com.pvp.eshop.repository.WishlistRepository;
import com.pvp.eshop.testutils.DatabaseTestDataCleaner;
import com.pvp.eshop.testutils.IntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.Instant;

@IntegrationTest
public class WishlistControllerTest {
    @Autowired TestRestTemplate restTemplate;
    @Autowired DatabaseTestDataCleaner databaseTestDataCleaner;
    @Autowired UserRepository userRepository;
    @Autowired ProductRepository productRepository;
    @Autowired WishlistRepository wishlistRepository;
    @Autowired MockMvc mvc;

    @BeforeEach
    void setup() {
        databaseTestDataCleaner.cleanUpTestData();
    }

    @Test
    void deleteWishlistProduct_whenWishlistIsPresent_shouldDelete() {
        var user2 = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse2 = userRepository.save(user2);

        var user1 = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse1 = userRepository.save(user1);

        var product = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse1.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var wishlistProduct = Wishlist.builder().userId(userResponse2.getId()).productId(productResponse.getId()).build();
        wishlistRepository.save(wishlistProduct);

        restTemplate.delete(String.format("/api/v1/wishlists/%d/%d",userResponse2.getId(),productResponse.getId()));

        var response = wishlistRepository.findAll();
        assertThat(response).isEmpty();
    }

    @Test
    void addWishlistProduct_whenWishlistIsPresent_shouldAddNewWishlist() {
        var user2 = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse2 = userRepository.save(user2);

        var user1 = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse1 = userRepository.save(user1);

        var product = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse1.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var wishlistProduct = Wishlist.builder().userId(userResponse2.getId()).productId(productResponse.getId()).build();
        restTemplate.postForEntity("/api/v1/wishlists", wishlistProduct, Wishlist.class);

        var response = wishlistRepository.findAll();
        assertThat(response).isNotEmpty();
        assertThat(response.size()).isEqualTo(1);
    }

    @Test
    void addWishlistProduct_whenWishlistIsPresent_shouldReturnOkStatus() {
        var user2 = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse2 = userRepository.save(user2);

        var user1 = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse1 = userRepository.save(user1);

        var product = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse1.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var wishlistProduct = Wishlist.builder().userId(userResponse2.getId()).productId(productResponse.getId()).build();
        var response = restTemplate.postForEntity("/api/v1/wishlists", wishlistProduct, Wishlist.class);

        assertThat(response).isNotNull();
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    void wishlistExistsByUserAndProduct_whenWishlistExists_shouldReturnTrue() {
        var user2 = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse2 = userRepository.save(user2);

        var user1 = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse1 = userRepository.save(user1);

        var product = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse1.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var wishlistProduct = Wishlist.builder().userId(userResponse2.getId()).productId(productResponse.getId()).build();
        wishlistRepository.save(wishlistProduct);

        var response = restTemplate.getForEntity(String.format("/api/v1/wishlists/exists/%d/%d",userResponse2.getId(),productResponse.getId()), Boolean.class);

        assertThat(response.getBody()).isEqualTo(Boolean.TRUE);
    }

    @Test
    void wishlistExistsByUserAndProduct_whenWishlistExists_shouldReturnOkStatus() {
        var user2 = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse2 = userRepository.save(user2);

        var user1 = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse1 = userRepository.save(user1);

        var product = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse1.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var wishlistProduct = Wishlist.builder().userId(userResponse2.getId()).productId(productResponse.getId()).build();
        wishlistRepository.save(wishlistProduct);

        var response = restTemplate.getForEntity(String.format("/api/v1/wishlists/exists/%d/%d",userResponse2.getId(),productResponse.getId()), Boolean.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    void deleteWishlistProduct_whenWishlistIsPresentAndDeleted_shouldReturnNoContentStatus() throws Exception {
        var user2 = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse2 = userRepository.save(user2);

        var user1 = User.builder().username("TestUsername").email("TestEmail@gmail.com").password("TestPassword").phone("TestPhone").role(Role.ADMIN).build();
        var userResponse1 = userRepository.save(user1);

        var product = Product.builder().name("TestName").status("TestStatus").description("TestDescription").price(1f).createdAt(Instant.now()).user_id(userResponse1.getId()).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var wishlistProduct = Wishlist.builder().userId(userResponse2.getId()).productId(productResponse.getId()).build();
        wishlistRepository.save(wishlistProduct);

        mvc.perform(MockMvcRequestBuilders.delete(String.format("/api/v1/wishlists/%d/%d",userResponse2.getId(),productResponse.getId()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                        .andExpect(status().isNoContent());
    }

    @Test
    void deleteWishlistProduct_whenWishlistIsNotPresent_shouldReturnNotFound() {
        var response = restTemplate.exchange("/api/v1/wishlists/1/1", HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}

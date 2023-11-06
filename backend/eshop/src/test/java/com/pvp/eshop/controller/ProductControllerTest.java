package com.pvp.eshop.controller;

import static org.assertj.core.api.Assertions.assertThat;

import com.pvp.eshop.model.Product;
import com.pvp.eshop.model.Role;
import com.pvp.eshop.model.User;
import com.pvp.eshop.model.Wishlist;
import com.pvp.eshop.model.enums.ProductCategory;
import com.pvp.eshop.model.requests.FilterRequest;
import com.pvp.eshop.model.requests.ProductRequest;
import com.pvp.eshop.repository.ProductRepository;
import com.pvp.eshop.repository.UserRepository;
import com.pvp.eshop.repository.WishlistRepository;
import com.pvp.eshop.testutils.DatabaseTestDataCleaner;
import com.pvp.eshop.testutils.IntegrationTest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import java.util.List;

@IntegrationTest
public class ProductControllerTest {
    @Autowired TestRestTemplate restTemplate;
    @Autowired DatabaseTestDataCleaner databaseTestDataCleaner;
    @Autowired ProductRepository productRepository;
    @Autowired UserRepository userRepository;
    @Autowired WishlistRepository wishlistRepository;

    @BeforeEach
    public void init() {
        databaseTestDataCleaner.cleanUpTestData();
    }

    @Test
    void getAllProducts_shouldReturnAllProducts() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var products = List.of(
                Product.builder().user_id(userResponse.getId()).name("Name").status("Status").description("Description").price(1F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("Name1").status("Status").description("Description1").price(1F).category(ProductCategory.CAMERAS).build()
        );
        productRepository.saveAll(products);

        var response = restTemplate.getForEntity("/api/v1/products", Product[].class);
        var object = response.getBody();

        assertThat(object).isNotNull();
        assertThat(object.length).isEqualTo(2);
        assertThat(object[0].getName()).isEqualTo(products.get(0).getName());
        assertThat(object[1].getName()).isEqualTo(products.get(1).getName());
    }

    @Test
    void getAllProducts_shouldReturnOkStatus() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var products = List.of(
                Product.builder().user_id(userResponse.getId()).name("Name").status("Status").description("Description").price(1F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("Name1").status("Status").description("Description1").price(1F).category(ProductCategory.CAMERAS).build()
        );
        productRepository.saveAll(products);

        var response = restTemplate.getForEntity("/api/v1/products", Product[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    void filterAllProducts_whenFilterRequestIsGiven_shouldFilterByGivenParameters() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var products = List.of(
                Product.builder().user_id(userResponse.getId()).name("A").status("Nauja").description("Description").price(30F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("B").status("Nauja").description("Description1").price(30F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("A").status("Nauja").description("Description1").price(10F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("A").status("Nauja").description("Description1").price(50F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("A").status("Naudota").description("Description1").price(30F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("A").status("Nauja").description("Description1").price(30F).category(ProductCategory.AUDIO).build()
        );
        productRepository.saveAll(products);

        var request = FilterRequest.builder().priceFrom("20").priceTo("40").state(List.of("Nauja")).sortColumn("name").sortDirection("DESC").category("CAMERAS").build();

        var response = restTemplate.postForEntity("/api/v1/products/filter", request, Product[].class);
        var object = response.getBody();

        assertThat(object).isNotNull();
        assertThat(object.length).isEqualTo(2);
        assertThat(object[0].getName()).isEqualTo(products.get(1).getName());
        assertThat(object[1].getName()).isEqualTo(products.get(0).getName());
    }

    @Test
    void filterProducts_shouldReturnOkStatus() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var products = List.of(
                Product.builder().user_id(userResponse.getId()).name("Name").status("Status").description("Description").price(1F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("Name1").status("Status").description("Description1").price(1F).category(ProductCategory.CAMERAS).build()
        );
        productRepository.saveAll(products);
        var request = FilterRequest.builder().priceFrom("20").priceTo("40").state(List.of("Nauja")).sortColumn("name").sortDirection("DESC").category("CAMERAS").build();

        var response = restTemplate.postForEntity("/api/v1/products/filter", request, Product[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getProductById_whenProductExists_shouldReturnProduct() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var product =
                Product.builder().user_id(userResponse.getId()).name("Name").status("Status").description("Description").price(1F).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var response = restTemplate.getForEntity("/api/v1/products/"+productResponse.getId(), Product.class);
        var object = response.getBody();

        assertThat(object).isNotNull();
        assertThat(object.getName()).isEqualTo(product.getName());
    }

    @Test
    public void getProductById_whenProductExists_shouldReturnOkStatus() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var product =
                Product.builder().user_id(userResponse.getId()).name("Name").status("Status").description("Description").price(1F).category(ProductCategory.CAMERAS).build();
        var productResponse = productRepository.save(product);

        var response = restTemplate.getForEntity("/api/v1/products/" + productResponse.getId(), Product.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getProductById_whenProductDoesNotExist_shouldReturnNotFoundStatus() {
        var response = restTemplate.getForEntity("/api/v1/products/1", Product.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    public void getProductsByUserId_whenProductExists_shouldReturnProduct() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var products = List.of(
                Product.builder().user_id(userResponse.getId()).name("Name").status("Status").description("Description").price(1F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("Name1").status("Status").description("Description1").price(1F).category(ProductCategory.CAMERAS).build()
        );
        productRepository.saveAll(products);

        var response = restTemplate.getForEntity("/api/v1/products/byUser/"+userResponse.getId(), Product[].class);
        var object = response.getBody();

        assertThat(object).isNotNull();
        assertThat(object.length).isEqualTo(2);
        assertThat(object[0].getName()).isEqualTo(products.get(0).getName());
        assertThat(object[1].getName()).isEqualTo(products.get(1).getName());
    }

    @Test
    public void getProductsByUserId_whenProductExists_shouldReturnOkStatus() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var products = List.of(
                Product.builder().user_id(userResponse.getId()).name("Name").status("Status").description("Description").price(1F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("Name1").status("Status").description("Description1").price(1F).category(ProductCategory.CAMERAS).build()
        );
        productRepository.saveAll(products);

        var response = restTemplate.getForEntity("/api/v1/products/byUser/"+userResponse.getId(), Product[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getProductsByUserId_whenProductDoesNotExist_shouldReturnNotFoundStatus() {
        var response = restTemplate.getForEntity("/api/v1/products/byUser/1", Product[].class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    public void createProduct_shouldCreateProduct() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var request = ProductRequest.builder()
                .user_id(userResponse.getId())
                .name("Name")
                .status("Status")
                .description("Description")
                .price(1F)
                .category(ProductCategory.CAMERAS)
                .city("City")
                .build();

        restTemplate.postForEntity("/api/v1/products", request, Product.class);

        var response = productRepository.findAll();

        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getName()).isEqualTo("Name");
    }

    @Test
    public void createProduct_shouldReturnCreatedStatus() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var request = ProductRequest.builder()
                .user_id(userResponse.getId())
                .name("Name")
                .status("Status")
                .description("Description")
                .price(1F)
                .category(ProductCategory.CAMERAS)
                .city("City")
                .build();

        var response = restTemplate.postForEntity("/api/v1/products", request, Product.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
    }

    @Test
    public void updateProduct_whenProductExists_shouldUpdateProduct() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var product = Product.builder()
                .user_id(userResponse.getId())
                .name("Name")
                .status("Status")
                .description("Description")
                .price(1F)
                .category(ProductCategory.CAMERAS)
                .city("City")
                .build();

        var productResponse = productRepository.save(product);

        var request = ProductRequest.builder()
                .user_id(userResponse.getId())
                .name("ChangedName")
                .status("Status")
                .description("Description")
                .price(1F)
                .category(ProductCategory.CAMERAS)
                .city("City")
                .build();

        restTemplate.put("/api/v1/products/" + productResponse.getId(), request);

        var response = productRepository.findAll();

        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getName()).isEqualTo("ChangedName");
    }

    @Test
    public void updateProduct_whenProductExists_shouldReturnOkStatus() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var product = Product.builder()
                .user_id(userResponse.getId())
                .name("Name")
                .status("Status")
                .description("Description")
                .price(1F)
                .category(ProductCategory.CAMERAS)
                .city("City")
                .build();

        var productResponse = productRepository.save(product);

        var request = ProductRequest.builder()
                .user_id(userResponse.getId())
                .name("ChangedName")
                .status("Status")
                .description("Description")
                .price(1F)
                .category(ProductCategory.CAMERAS)
                .city("City")
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ProductRequest> entity = new HttpEntity<>(request, headers);

        var response = restTemplate.exchange("/api/v1/products/" + productResponse.getId(), HttpMethod.PUT, entity, Product.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void updateProduct_whenProductExists_shouldReturnNotFoundStatus() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var product = Product.builder()
                .user_id(userResponse.getId())
                .name("Name")
                .status("Status")
                .description("Description")
                .price(1F)
                .category(ProductCategory.CAMERAS)
                .city("City")
                .build();

        productRepository.save(product);

        var request = ProductRequest.builder()
                .user_id(userResponse.getId())
                .name("ChangedName")
                .status("Status")
                .description("Description")
                .price(1F)
                .category(ProductCategory.CAMERAS)
                .city("City")
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ProductRequest> entity = new HttpEntity<>(request, headers);

        var response = restTemplate.exchange("/api/v1/products/1", HttpMethod.PUT, entity, Product.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    public void deleteProduct_whenProductExists_shouldDeleteProduct() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var product = Product.builder()
                .user_id(userResponse.getId())
                .name("Name")
                .status("Status")
                .description("Description")
                .price(1F)
                .category(ProductCategory.CAMERAS)
                .city("City")
                .build();

        var productResponse = productRepository.save(product);

        restTemplate.delete("/api/v1/products/"+productResponse.getId());

        var response = productRepository.findAll();

        assertThat(response).isEmpty();
    }

    @Test
    public void deleteProduct_whenProductExists_shouldReturnOkStatus() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var product = Product.builder()
                .user_id(userResponse.getId())
                .name("Name")
                .status("Status")
                .description("Description")
                .price(1F)
                .category(ProductCategory.CAMERAS)
                .city("City")
                .build();

        var productResponse = productRepository.save(product);

        var response = restTemplate.exchange("/api/v1/products/" + productResponse.getId(), HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void deleteProduct_whenDoesNotExist_shouldReturnNotFoundStatus() {
        var response = restTemplate.exchange("/api/v1/products/1", HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    public void findMaxPrice_shouldReturnMaxPrice() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var products = List.of(
                Product.builder().user_id(userResponse.getId()).name("Name").status("Status").description("Description").price(1F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("Name1").status("Status").description("Description1").price(2F).category(ProductCategory.CAMERAS).build()
        );
        productRepository.saveAll(products);

        var response = restTemplate.getForEntity("/api/v1/products/maxPrice", Float.class);
        var object = response.getBody();

        assertThat(object).isEqualTo(2F);
    }

    @Test
    public void findMaxPrice_shouldReturnOkStatus() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var products = List.of(
                Product.builder().user_id(userResponse.getId()).name("Name").status("Status").description("Description").price(1F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("Name1").status("Status").description("Description1").price(2F).category(ProductCategory.CAMERAS).build()
        );
        productRepository.saveAll(products);

        var response = restTemplate.getForEntity("/api/v1/products/maxPrice", Float.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void findMinPrice_shouldReturnMaxPrice() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var products = List.of(
                Product.builder().user_id(userResponse.getId()).name("Name").status("Status").description("Description").price(1F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("Name1").status("Status").description("Description1").price(2F).category(ProductCategory.CAMERAS).build()
        );
        productRepository.saveAll(products);

        var response = restTemplate.getForEntity("/api/v1/products/minPrice", Float.class);
        var object = response.getBody();

        assertThat(object).isEqualTo(1F);
    }

    @Test
    public void findMinPrice_shouldReturnOkStatus() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var products = List.of(
                Product.builder().user_id(userResponse.getId()).name("Name").status("Status").description("Description").price(1F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("Name1").status("Status").description("Description1").price(2F).category(ProductCategory.CAMERAS).build()
        );
        productRepository.saveAll(products);

        var response = restTemplate.getForEntity("/api/v1/products/minPrice", Float.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    void getWishlistProductsByUserID_shouldReturnAllUsersWishlistProducts() {
        var user = User.builder()
                .username("TestUsername")
                .email("TestEmail@gmail.com")
                .password("TestPassword")
                .phone("TestPhone")
                .role(Role.ADMIN)
                .build();
        var userResponse = userRepository.save(user);

        var products = List.of(
                Product.builder().user_id(userResponse.getId()).name("Name").status("Status").description("Description").price(1F).category(ProductCategory.CAMERAS).build(),
                Product.builder().user_id(userResponse.getId()).name("Name1").status("Status").description("Description1").price(2F).category(ProductCategory.CAMERAS).build()
        );
        productRepository.saveAll(products);

        var user2 = User.builder()
                .username("TestUsername2")
                .email("TestEmail2@gmail.com")
                .password("TestPassword2")
                .phone("TestPhone2")
                .role(Role.ADMIN)
                .build();
        var userResponse2 = userRepository.save(user2);

        var wishlistProduct =
                Wishlist.builder().userId(userResponse2.getId()).productId(products.get(0).getId()).build();
        wishlistRepository.save(wishlistProduct);

        var response = restTemplate.getForEntity("/api/v1/products/wishlist/byUser/"+userResponse2.getId(), Product[].class);
        var object = response.getBody();

        assertThat(object).isNotNull();
        assertThat(object.length).isEqualTo(1);
        assertThat(object[0].getName()).isEqualTo("Name");
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}

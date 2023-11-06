package com.pvp.eshop.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.anyLong;

import com.pvp.eshop.model.Product;
import com.pvp.eshop.model.User;
import com.pvp.eshop.model.requests.FilterRequest;
import com.pvp.eshop.model.requests.ProductRequest;
import com.pvp.eshop.service.ProductService;
import com.pvp.eshop.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

public class ProductControllerTest {
    private ProductController productController;
    private ProductService productService;
    private UserService userService;

    @BeforeEach
    void setUp() {
        productService = mock(ProductService.class);
        userService = mock(UserService.class);
        productController = new ProductController(productService, userService);
    }

    @Test
    void getAllProducts_shouldReturnListOfProducts() {
        List<Product> productList = new ArrayList<>();
        when(productService.getAllProducts()).thenReturn(productList);

        ResponseEntity<List<Product>> response = productController.getAllProducts();

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(productList);
    }

    @Test
    void filterProducts_shouldReturnFilteredProducts() {
        FilterRequest filterRequest = new FilterRequest();
        List<Product> filteredProducts = new ArrayList<>();
        when(productService.filterProducts(filterRequest)).thenReturn(filteredProducts);

        ResponseEntity<List<Product>> response = productController.filterProducts(filterRequest);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(filteredProducts);
    }

    @Test
    void getProductById_existingProduct_shouldReturnProduct() {
        long productId = 1L;
        Product product = new Product();
        when(productService.existsProduct(productId)).thenReturn(true);
        when(productService.getProductById(productId)).thenReturn(product);

        ResponseEntity<Product> response = productController.getProductById(productId);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(product);
    }

    @Test
    void getProductById_nonExistingProduct_shouldReturnNotFound() {
        long productId = 1L;
        when(productService.existsProduct(productId)).thenReturn(false);

        ResponseEntity<Product> response = productController.getProductById(productId);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void createProduct_shouldReturnCreatedProduct() {
        ProductRequest productRequest = new ProductRequest();
        Product createdProduct = new Product();
        when(productService.createProduct(productRequest)).thenReturn(createdProduct);

        ResponseEntity<Product> response = productController.createProduct(productRequest);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isEqualTo(createdProduct);
    }

    @Test
    void updateProduct_existingProduct_shouldReturnUpdatedProduct() {
        long productId = 1L;
        ProductRequest productRequest = new ProductRequest();
        Product updatedProduct = new Product();
        when(productService.existsProduct(productId)).thenReturn(true);
        when(productService.updateProduct(productId, productRequest)).thenReturn(updatedProduct);

        ResponseEntity<Product> response = productController.updateProduct(productId, productRequest);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(updatedProduct);
    }

    @Test
    void updateProduct_nonExistingProduct_shouldReturnNotFound() {
        long productId = 1L;
        ProductRequest productRequest = new ProductRequest();
        when(productService.existsProduct(productId)).thenReturn(false);

        ResponseEntity<Product> response = productController.updateProduct(productId, productRequest);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void deleteProduct_existingProduct_shouldReturnProductsByUserId() {
        long productId = 1L;
        long userId = 1L;
        Product product = new Product();
        when(productService.existsProduct(productId)).thenReturn(true);
        when(productService.getProductById(productId)).thenReturn(product);
        when(productService.getProductsByUserId(userId)).thenReturn(new ArrayList<>());

        ResponseEntity<List<Product>> response = productController.deleteProduct(productId);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEmpty();
    }

    @Test
    void deleteProduct_nonExistingProduct_shouldReturnNotFound() {
        long productId = 1L;
        when(productService.existsProduct(productId)).thenReturn(false);

        ResponseEntity<List<Product>> response = productController.deleteProduct(productId);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}

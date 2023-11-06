package com.pvp.eshop.service;

import com.pvp.eshop.model.Product;
import com.pvp.eshop.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    private ProductService productService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        productService = new ProductService(productRepository);
    }


    @Test
    public void testGetAllProducts_GetsExpectedNumberOfProducts() {
        List<Product> products = new ArrayList<>();
        products.add(new Product());
        products.add(new Product());
        products.add(new Product());

        when(productRepository.findAll()).thenReturn(products);

        List<Product> result = productService.getAllProducts();

        assertEquals(3, result.size());
    }

    @Test
    public void testSortProducts_checkIfSortingIsWorking() {
        Product product1 = new Product();
        product1.setName("B");
        Product product2 = new Product();
        product2.setName("C");
        Product product3 = new Product();
        product3.setName("A");

        List<Product> products = new ArrayList<>();
        products.add(product1);
        products.add(product2);
        products.add(product3);

        List<Product> result = productService.sortProducts(products, "name", "ASC");

        assertEquals("A", result.get(0).getName());
        assertEquals("B", result.get(1).getName());
        assertEquals("C", result.get(2).getName());
    }

    @Test
    public void testGetProductById_ChecksIfGetsProductByID() {
        Product product = new Product();
        product.setId(1L);

        when(productRepository.findById(1L)).thenReturn(java.util.Optional.of(product));

        Product result = productService.getProductById(1L);

        assertEquals(1L, result.getId());
    }

    @Test
    public void testGetProductsByUserId_ProductsByUserId() {
        Product product1 = new Product();
        Product product2 = new Product();

        List<Product> products = new ArrayList<>();
        products.add(product1);
        products.add(product2);

        when(productRepository.productsByUser(1L)).thenReturn(products);

        List<Product> result = productService.getProductsByUserId(1L);

        assertEquals(2, result.size());
    }

    @Test
    public void testUploadFile_TestingLoading() {
        MultipartFile file = new MockMultipartFile("test.jpg", new byte[0]);

        productService.uploadFile("uploadDir", file);
    }

    @Test
    public void testFindMaxPrice_ChecksFindMaxPrice() {
        when(productRepository.findMaxPrice()).thenReturn(199.99F);

        Float result = productService.findMaxPrice();

        assertEquals(199.99F, result);
    }

    @Test
    public void testFindMinPrice_TestsMinPrice() {
        when(productRepository.findMinPrice()).thenReturn(49.99F);

        Float result = productService.findMinPrice();

        assertEquals(49.99F, result);
    }

    @Test
    public void testGetUserWishlistProducts_GetsUserWishlist() {
        Product product1 = new Product();
        Product product2 = new Product();

        List<Product> products = new ArrayList<>();
        products.add(product1);
        products.add(product2);

        when(productRepository.getUserWishlistProducts(1L)).thenReturn(products);

        List<Product> result = productService.getUserWishlistProducts(1L);

        assertEquals(2, result.size());
    }
}

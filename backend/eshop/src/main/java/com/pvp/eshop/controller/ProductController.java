package com.pvp.eshop.controller;

import java.io.IOException;
import java.util.List;

import com.pvp.eshop.model.Product;
import com.pvp.eshop.model.requests.FilterRequest;
import com.pvp.eshop.model.requests.ProductRequest;
import com.pvp.eshop.service.ProductService;
import com.pvp.eshop.service.UserService;
import jakarta.validation.Valid;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    ProductService productService;
    UserService userService;

    public ProductController(ProductService productService, UserService userService) {
        this.productService = productService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @PostMapping("/filter")
    public ResponseEntity<List<Product>> filterProducts(@Valid @RequestBody FilterRequest request) {
        return new ResponseEntity<>(productService.filterProducts(request), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") long id) {
        if (productService.existsProduct(id)) {
            return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/byUser/{id}")
    public ResponseEntity<List<Product>> getProductsByUserId(@PathVariable("id") long id) {
        if (userService.existsUser(id)) {
            return new ResponseEntity<>(productService.getProductsByUserId(id), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid ProductRequest request) {
        return new ResponseEntity<>(productService.createProduct(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") long id, @Valid ProductRequest request) {
        if (productService.existsProduct(id)) {
            return new ResponseEntity<>(productService.updateProduct(id, request), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Product>> deleteProduct(@PathVariable("id") long id) {
        if (productService.existsProduct(id)) {
            Product product = productService.getProductById(id);
            long userId = product.getUser_id();
            productService.deleteProduct(id);
            return new ResponseEntity<>(productService.getProductsByUserId(userId), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getImage/{id}")
    public ResponseEntity<ByteArrayResource> downloadImage(@PathVariable("id") String id) throws IOException {
        String path = "backend/eshop/src/main/resources/assets/products/" + id;
        byte[] data = productService.getImageFile(path);
        ByteArrayResource resource = new ByteArrayResource(data);
        return ResponseEntity.ok().contentLength(data.length).header("Content-type", "application/octet-stream")
                .header("Content-disposition", "attachment; filename=\"" + path + "\"")
                .body(resource);
    }

    @GetMapping("/maxPrice")
    public ResponseEntity<Float> findMaxPrice() {
        return new ResponseEntity<>(productService.findMaxPrice(), HttpStatus.OK);
    }
    @GetMapping("/minPrice")
    public ResponseEntity<Float> findMinPrice() {
        return new ResponseEntity<>(productService.findMinPrice(), HttpStatus.OK);
    }

    @GetMapping("/wishlist/byUser/{id}")
    public ResponseEntity<List<Product>> getWishlistProductsByUserID(@PathVariable("id") long id) {
        return new ResponseEntity<>(productService.getUserWishlistProducts(id), HttpStatus.OK);
    }
}
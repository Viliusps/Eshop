package com.pvp.eshop.repository;

import java.util.List;

import com.pvp.eshop.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(
            value = "SELECT * FROM products p WHERE p.user_id=:id",
            nativeQuery = true
    )
    List<Product> productsByUser(Long id);

    @Query(
            value = "SELECT * FROM products p " +
            "WHERE LOWER(p.name) LIKE LOWER(CONCAT(:name, '%')) " +
            "AND p.status IN (:states) " +
            "AND p.price BETWEEN :priceFrom AND :priceTo " +
            "AND (:category IS NULL OR p.category = :category)",
            nativeQuery = true
    )
    List<Product> filter(String name, Float priceFrom, Float priceTo, List<String> states, String category);

    @Query(
            value = "SELECT MAX(price) FROM products",
            nativeQuery = true
    )
    Float findMaxPrice();

    @Query(
            value = "SELECT MIN(price) FROM products",
            nativeQuery = true
    )
    Float findMinPrice();

    @Query(
            value = "SELECT p.* FROM products p WHERE id IN " +
                    "(SELECT w.product_id FROM wishlists w WHERE w.user_id = :id)",
            nativeQuery = true
    )
    List<Product> getUserWishlistProducts(long id);
}
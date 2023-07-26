package com.pvp.eshop.repository;

import com.pvp.eshop.model.Wishlist;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    @Query(
            value = "SELECT EXISTS(SELECT * FROM wishlists WHERE user_id = :userId AND product_id = :productId)",
            nativeQuery = true
    )
    Boolean existsByUserAndProduct(long userId, long productId);

    void deleteByUserIdAndProductId(long userId, long productId);
}

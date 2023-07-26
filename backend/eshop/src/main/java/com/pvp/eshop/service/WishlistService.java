package com.pvp.eshop.service;

import com.pvp.eshop.model.Wishlist;
import com.pvp.eshop.repository.WishlistRepository;
import org.springframework.stereotype.Service;

@Service
public class WishlistService {
    private final WishlistRepository wishlistRepository;

    public WishlistService(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    public boolean existsWishlistProduct(long userId, long productId) {
        return wishlistRepository.existsByUserAndProduct(userId, productId);
    }

    public void deleteWishlistProduct(long userId, long productId) {
        wishlistRepository.deleteByUserIdAndProductId(userId, productId);
    }

    public Wishlist addWishlistProduct(Wishlist wishlist) {
        Wishlist newWishlist = new Wishlist();
        newWishlist.setUserId(wishlist.getUserId());
        newWishlist.setProductId(wishlist.getProductId());
        return wishlistRepository.save(newWishlist);
    }

    public Boolean existsByUserAndProduct(long userId, long productId) {
        return wishlistRepository.existsByUserAndProduct(userId, productId);
    }
}

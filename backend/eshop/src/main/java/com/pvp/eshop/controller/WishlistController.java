package com.pvp.eshop.controller;

import com.pvp.eshop.model.Wishlist;
import com.pvp.eshop.service.WishlistService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/wishlists")
public class WishlistController {

    WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @DeleteMapping("/{userId}/{productId}")
    public ResponseEntity<HttpStatus> deleteWishlistProduct(@PathVariable("userId") long userId,
                                                            @PathVariable("productId") long productId) {
        if (wishlistService.existsWishlistProduct(userId, productId)) {
            wishlistService.deleteWishlistProduct(userId, productId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Wishlist> addWishlistProduct(@RequestBody Wishlist wishlist) {
        return new ResponseEntity<>(wishlistService.addWishlistProduct(wishlist),HttpStatus.OK);
    }

    @GetMapping("/exists/{userId}/{productId}")
    public ResponseEntity<Boolean> wishlistExistsByUserAndProduct(@PathVariable("userId") long userId,
                                                                      @PathVariable("productId") long productId) {
        return new ResponseEntity<>(wishlistService.existsByUserAndProduct(userId,productId),HttpStatus.OK);
    }
}

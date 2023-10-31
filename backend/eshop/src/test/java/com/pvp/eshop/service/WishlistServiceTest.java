package com.pvp.eshop.service;

import com.pvp.eshop.model.Wishlist;
import com.pvp.eshop.repository.WishlistRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class WishlistServiceTest {

    WishlistRepository wishlistRepository;
    WishlistService wishlistService;

    @BeforeEach
    void setup() {
        wishlistRepository = mock(WishlistRepository.class);
        wishlistService = new WishlistService(wishlistRepository);
    }

    @Test
    void existsWishlistProduct_whenProductExists_shouldReturnTrue() {
        when(wishlistRepository.existsByUserAndProduct(1L, 1L)).thenReturn(true);

        boolean result = wishlistService.existsWishlistProduct(1L, 1L);

        assertThat(result).isTrue();
    }

    @Test
    void existsWishlistProduct_whenProductDoesNotExist_shouldReturnFalse() {
        when(wishlistRepository.existsByUserAndProduct(1L, 1L)).thenReturn(false);

        boolean result = wishlistService.existsWishlistProduct(1L, 1L);

        assertThat(result).isFalse();
    }

    @Test
    void deleteWishlistProduct_whenProductExists_shouldDeleteProduct() {
        when(wishlistRepository.existsByUserAndProduct(1L, 1L)).thenReturn(true);

        assertThatCode(() -> wishlistService.deleteWishlistProduct(1L, 1L)).doesNotThrowAnyException();

        assertThat(wishlistRepository.existsByUserAndProduct(1L, 1L)).isTrue();
    }

    @Test
    void deleteWishlistProduct_whenProductDoesNotExist_shouldThrowException() {
        when(wishlistRepository.existsByUserAndProduct(1L, 1L)).thenReturn(false);

        assertThatCode(() -> wishlistService.deleteWishlistProduct(1L, 1L)).doesNotThrowAnyException();

        assertThat(wishlistRepository.existsByUserAndProduct(1L, 1L)).isFalse();
    }

    @Test
    void addWishlistProduct_shouldAddProduct() {
        var wishlist = Wishlist.builder().userId(1L).productId(1L).build();
        var expected = Wishlist.builder().userId(1L).productId(1L).build();

        when(wishlistRepository.save(any())).thenReturn(expected);

        var actual = wishlistService.addWishlistProduct(wishlist);

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void existsByUserAndProduct_whenProductExists_shouldReturnTrue() {
        when(wishlistRepository.existsByUserAndProduct(1L, 1L)).thenReturn(true);

        var result = wishlistService.existsByUserAndProduct(1L, 1L);

        assertThat(result).isTrue();
    }

    @Test
    void existsByUserAndProduct_whenProductDoesNotExist_shouldReturnFalse() {
        when(wishlistRepository.existsByUserAndProduct(1L, 1L)).thenReturn(false);

        var result = wishlistService.existsByUserAndProduct(1L, 1L);

        assertThat(result).isFalse();
    }
}

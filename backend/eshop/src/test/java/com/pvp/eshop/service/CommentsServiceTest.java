package com.pvp.eshop.service;

import com.pvp.eshop.model.Comment;
import com.pvp.eshop.repository.CommentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CommentsServiceTest {

    CommentRepository commentRepository;
    CommentsService commentsService;

    @BeforeEach
    void setup() {
        commentRepository = mock(CommentRepository.class);
        commentsService = new CommentsService(commentRepository);
    }

    @Test
    void getCommentsByProducts_returnsCommentsByProduct() {
        when(commentRepository.getCommentsByProduct(1L)).thenReturn(List.of(
                Comment.builder().product_id(1L).user_id(1L).date(new Date()).text("Some text").likeCount(2L).build()));

        var result = commentsService.getCommentsByProduct(1L);

        assertThat(result.size()).isEqualTo(1);
        assertThat(result.get(0).getLikeCount()).isEqualTo(2L);
    }
}

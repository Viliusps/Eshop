package com.pvp.eshop.service;

import com.pvp.eshop.model.Comment;
import com.pvp.eshop.repository.CommentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
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

    @Test
    void getCommentsByProducts_returnsEmptyListWhenPostDoesNotExist() {
        when(commentRepository.getCommentsByProduct(1L)).thenReturn(List.of());

        var result = commentsService.getCommentsByProduct(1L);

        assertThat(result.size()).isEqualTo(0);
    }

    @Test
    void postComment_whenCommentIsPosted_shouldCorrectlyAddToDatabase() {
        var comment = Comment.builder().text("TestText").user_id(1L).product_id(1L).date(new Date()).build();

        when(commentRepository.save(any())).thenReturn(comment);

        var response = commentsService.postComment(comment);

        assertThat(response.getText()).isEqualTo("TestText");
    }
}

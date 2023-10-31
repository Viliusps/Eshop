package com.pvp.eshop.service;

import com.pvp.eshop.model.Reaction;
import com.pvp.eshop.model.ReactionState;
import com.pvp.eshop.repository.CommentRepository;
import com.pvp.eshop.repository.ReactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ReactionServiceTest {

    ReactionRepository reactionRepository;
    CommentRepository commentRepository;
    ReactionService reactionService;

    @BeforeEach
    void setup() {
        commentRepository = mock(CommentRepository.class);
        reactionRepository = mock(ReactionRepository.class);
        reactionService = new ReactionService(commentRepository, reactionRepository);
    }

    @Test
    void getCommentsLikedOrDislikedByUser_returnsCommentsLikedOrDislikedByUser() {
        var user_id = 1L;
        var product_id = 1L;
        var state = "LIKE";
        var expected = List.of(1, 2, 3);

        when(commentRepository.getCommentsLikedOrDislikedByUser(user_id, product_id, state)).thenReturn(expected);

        var actual = reactionService.getCommentsLikedOrDislikedByUser(user_id, product_id, state);

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void getCommentsLikedOrDislikedByUser_returnsEmptyListWhenNoCommentsLikedOrDislikedByUser() {
        var user_id = 1L;
        var product_id = 1L;
        var state = "LIKE";

        when(commentRepository.getCommentsLikedOrDislikedByUser(user_id, product_id, state)).thenReturn(List.of());

        var actual = reactionService.getCommentsLikedOrDislikedByUser(user_id, product_id, state);

        assertThat(actual).isEmpty();
    }

    @Test
    void likeOrDislikeComment_whenNoPriorReactionAndCommentIsLiked_shouldCorrectlyAddToDatabase() {
        var reaction = Reaction.builder().user_id(1L).comment_id(1L).status(ReactionState.LIKE).build();
        var expected = Reaction.builder().user_id(1L).comment_id(1L).status(ReactionState.LIKE).build();

        when(reactionRepository.getByUserIdCommentId(reaction.getUser_id(), reaction.getComment_id())).thenReturn(null);
        when(reactionRepository.save(any())).thenReturn(expected);

        var actual = reactionService.likeOrDislikeComment(reaction);

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void likeOrDislikeComment_whenNoPriorReactionAndCommentIsDisliked_shouldCorrectlyAddToDatabase() {
        var reaction = Reaction.builder().user_id(1L).comment_id(1L).status(ReactionState.DISLIKE).build();
        var expected = Reaction.builder().user_id(1L).comment_id(1L).status(ReactionState.DISLIKE).build();

        when(reactionRepository.getByUserIdCommentId(reaction.getUser_id(), reaction.getComment_id())).thenReturn(null);
        when(reactionRepository.save(any())).thenReturn(expected);

        var actual = reactionService.likeOrDislikeComment(reaction);

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void likeOrDislikeComment_whenCommentIsLikedAgain_shouldCorrectlyAddToDatabase() {
        var reaction = Reaction.builder().user_id(1L).comment_id(1L).status(ReactionState.LIKE).build();
        var previousReaction = Reaction.builder().user_id(1L).comment_id(1L).status(ReactionState.LIKE).build();

        when(reactionRepository.getByUserIdCommentId(reaction.getUser_id(), reaction.getComment_id())).thenReturn(previousReaction);
        when(reactionRepository.save(any())).thenReturn(null);

        var actual = reactionService.likeOrDislikeComment(reaction);

        assertThat(actual).isEqualTo(null);
    }

    @Test
    void likeOrDislikeComment_whenCommentIsDislikedAgain_shouldCorrectlyAddToDatabase() {
        var reaction = Reaction.builder().user_id(1L).comment_id(1L).status(ReactionState.DISLIKE).build();
        var previousReaction = Reaction.builder().user_id(1L).comment_id(1L).status(ReactionState.DISLIKE).build();

        when(reactionRepository.getByUserIdCommentId(reaction.getUser_id(), reaction.getComment_id())).thenReturn(previousReaction);
        when(reactionRepository.save(any())).thenReturn(null);

        var actual = reactionService.likeOrDislikeComment(reaction);

        assertThat(actual).isEqualTo(null);
    }
}

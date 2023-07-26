package com.pvp.eshop.service;

import java.util.List;

import com.pvp.eshop.model.Reaction;
import com.pvp.eshop.model.ReactionState;
import com.pvp.eshop.repository.CommentRepository;
import com.pvp.eshop.repository.ReactionRepository;
import org.springframework.stereotype.Service;


@Service
public class ReactionService {
    private final CommentRepository commentRepository;
    private final ReactionRepository reactionRepository;

    public ReactionService(CommentRepository commentRepository, ReactionRepository reactionRepository) {
        this.commentRepository = commentRepository;
        this.reactionRepository = reactionRepository;
    }

    public Reaction likeOrDislikeComment(Reaction reaction) {
        Reaction newReaction = new Reaction();
        newReaction.setComment_id(reaction.getComment_id());
        newReaction.setStatus(reaction.getStatus());
        newReaction.setUser_id(reaction.getUser_id());
        Reaction oldReaction = reactionRepository.getByUserIdCommentId(newReaction.getUser_id(),
            newReaction.getComment_id());
        if (oldReaction == null) {
            return reactionRepository.save(newReaction);
        } else if (oldReaction.getStatus() == ReactionState.DISLIKE &&
            newReaction.getStatus() == ReactionState.DISLIKE) {
            reactionRepository.delete(oldReaction);
            return null;
        } else if (oldReaction.getStatus() == ReactionState.LIKE && newReaction.getStatus() == ReactionState.LIKE) {
            reactionRepository.delete(oldReaction);
            return null;
        } else {
            reactionRepository.delete(oldReaction);
            return reactionRepository.save(newReaction);
        }
    }

    public List<Integer> getCommentsLikedOrDislikedByUser(long user_id, long product_id, String state) {
        return commentRepository.getCommentsLikedOrDislikedByUser(user_id, product_id, state);
    }
}
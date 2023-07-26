package com.pvp.eshop.service;

import java.util.List;

import com.pvp.eshop.model.Comment;
import com.pvp.eshop.repository.CommentRepository;
import org.springframework.stereotype.Service;


@Service
public class CommentsService {
    private final CommentRepository commentRepository;

    public CommentsService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getCommentsByProduct(long id) {
        return commentRepository.getCommentsByProduct(id);
    }

    public Comment postComment(Comment comment) {
        Comment newComment = new Comment();
        newComment.setText(comment.getText());
        newComment.setProduct_id(comment.getProduct_id());
        newComment.setDate(comment.getDate());
        newComment.setUser_id(comment.getUser_id());
        return commentRepository.save(newComment);
    }
}
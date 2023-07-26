package com.pvp.eshop.controller;

import java.util.List;

import com.pvp.eshop.model.Comment;
import com.pvp.eshop.service.CommentsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/comments")
public class CommentsController {
    CommentsService commentService;

    public CommentsController(CommentsService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/byProduct/{id}")
    public ResponseEntity<List<Comment>> getCommentsByProduct(@PathVariable("id") long id) {
        return new ResponseEntity<>(commentService.getCommentsByProduct(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Comment> postComment(@Valid @RequestBody Comment comment) {
        return new ResponseEntity<>(commentService.postComment(comment), HttpStatus.CREATED);
    }
}
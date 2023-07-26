package com.pvp.eshop.controller;

import java.util.List;
import java.util.Map;

import com.pvp.eshop.model.Reaction;
import com.pvp.eshop.service.ReactionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@CrossOrigin
@RestController
@RequestMapping("/api/v1/reactions")
public class ReactionController {
    ReactionService reactionService;

    public ReactionController(ReactionService reactionService) {
        this.reactionService = reactionService;
    }

    @PostMapping("/likes")
    public ResponseEntity<Reaction> likeOrDislikeComment(@Valid @RequestBody Reaction reaction) {
        return new ResponseEntity<>(reactionService.likeOrDislikeComment(reaction), HttpStatus.CREATED);
    }

    @PostMapping("/likedByUser")
    public ResponseEntity<List<Integer>> getCommentsLikedOrDislikedByUser(@RequestBody Map<String, Object> requestMap) {
        long user_id = Long.valueOf(requestMap.get("user_id").toString());
        long product_id = Long.valueOf(requestMap.get("product_id").toString());
        String state = (String) requestMap.get("status");
        return new ResponseEntity<>(reactionService.getCommentsLikedOrDislikedByUser(user_id, product_id, state),
        HttpStatus.OK);
    }
}
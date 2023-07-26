package com.pvp.eshop.repository;

import java.util.List;

import com.pvp.eshop.model.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ReactionRepository extends JpaRepository<Reaction, Long> {

    @Query
        (
        value = "SELECT * FROM reactions l WHERE l.comment_id = :commentId",
        nativeQuery = true
        )
    List<Reaction> findByCommentId(Long commentId);

    @Query
        (
        value = "SELECT * FROM reactions l WHERE l.comment_id = :commentId AND l.user_id = :userId",
        nativeQuery = true
        )
    Reaction getByUserIdCommentId(Long userId, Long commentId);
}
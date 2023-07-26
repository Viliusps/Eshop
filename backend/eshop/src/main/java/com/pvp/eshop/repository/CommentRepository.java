package com.pvp.eshop.repository;

import java.util.List;

import com.pvp.eshop.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query
        (
        value = "SELECT c.*, u.username FROM comments c " +
        "INNER JOIN users u ON c.user_id = u.id WHERE c.product_id = :productId ORDER BY c.date DESC",
        nativeQuery = true
        )
    List<Comment> findByProductId(Long productId);

    @Query
        (
        value = "SELECT c.id FROM comments c " +
        "INNER JOIN reactions l ON l.comment_id = c.id WHERE c.product_id = :productId " +
        "AND l.user_id = :userId AND l.status = :state",
        nativeQuery = true
        )
    List<Integer> getCommentsLikedOrDislikedByUser(Long userId, Long productId, String state);

    @Query
        (
        value = "SELECT c.*, COALESCE(l.likeCount, 0) AS likeCount " +
        "FROM comments c JOIN users u ON c.user_id = u.id LEFT JOIN " +
        "(SELECT comment_id, COALESCE(SUM(CASE WHEN status = 'LIKE' THEN 1 " +
        "WHEN status = 'DISLIKE' THEN -1 ELSE 0 END), 0) AS likeCount FROM reactions " +
        "GROUP BY comment_id) l ON c.id = l.comment_id WHERE c.product_id = :id ORDER BY c.date DESC",
        nativeQuery = true
        )
    List<Comment> getCommentsByProduct(Long id);
}
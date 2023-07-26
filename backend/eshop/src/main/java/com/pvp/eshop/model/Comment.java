package com.pvp.eshop.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;
import org.springframework.beans.factory.annotation.Value;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @NotBlank(message = "Text is mandatory")
    @Column(name = "text", nullable = false)
    private String text;

    @NotNull(message = "user id is mandatory")
    @Column(name = "user_id")
    private long user_id;

    @NotNull(message = "product id is mandatory")
    @Column(name = "product_id")
    private long product_id;

    @NotNull(message = "Date is mandatory")
    @Column(name = "date")
    private Date date;

    @Formula("(SELECT COALESCE(SUM(CASE WHEN l.status = 'LIKE' THEN 1 " +
        "WHEN l.status = 'DISLIKE' THEN -1 ELSE 0 END), 0) FROM reactions l WHERE l.comment_id = id)")
    @Value("0")
    private Long likeCount;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "comment_id")
    private List<Reaction> reactions = new ArrayList<>();

}

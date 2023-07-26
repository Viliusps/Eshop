package com.pvp.eshop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "reactions")
public class Reaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @NotNull(message = "user id is mandatory")
    @Column(name = "user_id")
    private long user_id;

    @NotNull(message = "comment id is mandatory")
    @Column(name = "comment_id")
    private long comment_id;

    @NotNull(message = "status is mandatory")
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private ReactionState status;
}

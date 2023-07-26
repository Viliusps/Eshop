package com.pvp.eshop.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.pvp.eshop.model.enums.ProductCategory;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @NotBlank(message = "Name is mandatory")
    @Column(name = "name", nullable = false)
    private String name;

    @NotBlank(message = "Status is mandatory")
    @Column(name = "status", nullable = false)
    private String status;

    @NotBlank(message = "Description is mandatory")
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull(message = "Price is mandatory")
    @Column(name = "price", nullable = false)
    private Float price;

    @Column(name = "created_at")
    @Generated(GenerationTime.ALWAYS)
    private Instant createdAt;

    @Column(name = "user_id")
    private long user_id;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private ProductCategory category;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "city")
    private String city;

    @Column(name = "hidden")
    private boolean hidden;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "product_id")
    private List<Wishlist> wishlists = new ArrayList<>();
}
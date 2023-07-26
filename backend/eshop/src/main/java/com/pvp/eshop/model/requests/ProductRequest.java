package com.pvp.eshop.model.requests;

import java.time.Instant;

import com.pvp.eshop.model.enums.ProductCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {

    private long id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "Status is mandatory")
    private String status;

    @NotBlank(message = "Description is mandatory")
    private String description;

    @NotNull(message = "Price is mandatory")
    private Float price;

    private Instant createdAt;

    private long user_id;

    private ProductCategory category;

    private MultipartFile image;

    @NotBlank(message = "City is mandatory")
    private String city;

    private boolean hidden;
}
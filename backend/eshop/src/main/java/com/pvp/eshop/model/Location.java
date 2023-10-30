package com.pvp.eshop.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "locations")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @NotBlank(message = "Address is mandatory")
    @Column(name = "address", nullable = false)
    private String address;

    @NotBlank(message = "Company is mandatory")
    @Column(name = "company", nullable = false)
    private String company;

    @NotBlank(message = "Longitude is mandatory")
    @Column(name = "longtitude", nullable = false)
    private String longitude;

    @NotBlank(message = "Lattitude is mandatory")
    @Column(name = "lattitude", nullable = false)
    private String lattitude;

    @Column(name = "city")
    private String city;

    @NotBlank(message = "State is mandatory")
    @Column(name = "state", nullable = false)
    private String state;
}
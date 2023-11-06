package com.pvp.eshop.model.requests;

import java.util.List;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FilterRequest {

    private String category;

    private String name;

    private List<String> state;

    private String priceFrom;

    private String priceTo;

    private String sortColumn;

    private String sortDirection;

}

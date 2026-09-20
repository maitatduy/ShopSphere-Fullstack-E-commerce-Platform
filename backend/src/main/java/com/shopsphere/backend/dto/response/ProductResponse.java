package com.shopsphere.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {
    private UUID id;
    private String brand;
    private String description;
    private String name;
    private BigDecimal price;
    private boolean newArrival;
    private String slug;
    private Float rating;
    private UUID categoryId;
    private String categoryName;
    private UUID categoryTypeId;
    private String categoryTypeName;
    private List<ProductVariantResponse> variants;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

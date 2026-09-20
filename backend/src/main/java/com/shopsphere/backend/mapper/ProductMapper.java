package com.shopsphere.backend.mapper;

import com.shopsphere.backend.dto.request.ProductRequest;
import com.shopsphere.backend.dto.response.ProductResponse;
import com.shopsphere.backend.dto.response.ProductVariantResponse;
import com.shopsphere.backend.entity.Category;
import com.shopsphere.backend.entity.CategoryType;
import com.shopsphere.backend.entity.Product;
import com.shopsphere.backend.entity.ProductVariant;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {
    public Product toEntity(ProductRequest request, Category category, CategoryType categoryType) {
        return Product.builder()
                .brand(request.getBrand())
                .description(request.getDescription())
                .name(request.getName())
                .price(request.getPrice())
                .newArrival(Boolean.TRUE.equals(request.getIsNewArrival()))
                .slug(request.getSlug())
                .category(category)
                .categoryType(categoryType)
                .build();
    }

    public void updateEntityFromRequest(Product product, ProductRequest request, Category category, CategoryType categoryType) {
        product.setBrand(request.getBrand());
        product.setDescription(request.getDescription());
        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setNewArrival(Boolean.TRUE.equals(request.getIsNewArrival()));
        product.setSlug(request.getSlug());
        product.setCategory(category);
        product.setCategoryType(categoryType);
    }

    public ProductResponse toResponse(Product product) {
        List<ProductVariantResponse> variants = product.getVariants() == null
                ? Collections.emptyList()
                : product.getVariants().stream().map(this::toVariantResponse).collect(Collectors.toList());

        return ProductResponse.builder()
                .id(product.getId())
                .brand(product.getBrand())
                .description(product.getDescription())
                .name(product.getName())
                .price(product.getPrice())
                .newArrival(product.isNewArrival())
                .slug(product.getSlug())
                .rating(product.getRating())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .categoryTypeId(product.getCategoryType() != null ? product.getCategoryType().getId() : null)
                .categoryTypeName(product.getCategoryType() != null ? product.getCategoryType().getName() : null)
                .variants(variants)
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    private ProductVariantResponse toVariantResponse(ProductVariant variant) {
        return ProductVariantResponse.builder()
                .id(variant.getId())
                .color(variant.getColor())
                .size(variant.getSize())
                .stockQuantity(variant.getStockQuantity())
                .createdAt(variant.getCreatedAt())
                .updatedAt(variant.getUpdatedAt())
                .build();
    }
}


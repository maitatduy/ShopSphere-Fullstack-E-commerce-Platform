package com.shopsphere.backend.mapper;

import com.shopsphere.backend.dto.request.CategoryRequest;
import com.shopsphere.backend.dto.response.CategoryResponse;
import com.shopsphere.backend.dto.request.CategoryTypeRequest;
import com.shopsphere.backend.dto.response.CategoryTypeResponse;
import com.shopsphere.backend.entity.Category;
import com.shopsphere.backend.entity.CategoryType;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public Category toEntity(CategoryRequest request) {
        return Category.builder()
                .code(request.getCode())
                .name(request.getName())
                .description(request.getDescription())
                .build();
    }

    public void updateEntityFromRequest(Category category, CategoryRequest request) {
        category.setCode(request.getCode());
        category.setName(request.getName());
        category.setDescription(request.getDescription());
    }

    public CategoryResponse toResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .code(category.getCode())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }

    public CategoryType toEntity(CategoryTypeRequest request, Category category) {
        return CategoryType.builder()
                .code(request.getCode())
                .name(request.getName())
                .description(request.getDescription())
                .category(category)
                .build();
    }

    public void updateEntityFromRequest(CategoryType categoryType, CategoryTypeRequest request, Category category) {
        categoryType.setCode(request.getCode());
        categoryType.setName(request.getName());
        categoryType.setDescription(request.getDescription());
        categoryType.setCategory(category);
    }

    public CategoryTypeResponse toResponse(CategoryType categoryType) {
        return CategoryTypeResponse.builder()
                .id(categoryType.getId())
                .code(categoryType.getCode())
                .name(categoryType.getName())
                .description(categoryType.getDescription())
                .categoryId(categoryType.getCategory() != null ? categoryType.getCategory().getId() : null)
                .categoryName(categoryType.getCategory() != null ? categoryType.getCategory().getName() : null)
                .build();
    }
}

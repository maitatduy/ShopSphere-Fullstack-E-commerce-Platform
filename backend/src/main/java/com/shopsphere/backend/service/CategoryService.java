package com.shopsphere.backend.service;

import com.shopsphere.backend.dto.request.CategoryRequest;
import com.shopsphere.backend.dto.response.CategoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface CategoryService {
    CategoryResponse create(CategoryRequest request);

    CategoryResponse getById(UUID id);

    Page<CategoryResponse> getAll(Pageable pageable);

    CategoryResponse update(UUID id, CategoryRequest request);

    void delete(UUID id);
}

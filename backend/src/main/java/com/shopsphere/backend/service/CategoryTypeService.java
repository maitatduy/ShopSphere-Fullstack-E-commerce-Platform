package com.shopsphere.backend.service;

import com.shopsphere.backend.dto.request.CategoryTypeRequest;
import com.shopsphere.backend.dto.response.CategoryTypeResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface CategoryTypeService {
    CategoryTypeResponse create(CategoryTypeRequest request);

    CategoryTypeResponse getById(UUID id);

    Page<CategoryTypeResponse> getAll(UUID categoryId, Pageable pageable);

    CategoryTypeResponse update(UUID id, CategoryTypeRequest request);

    void delete(UUID id);
}

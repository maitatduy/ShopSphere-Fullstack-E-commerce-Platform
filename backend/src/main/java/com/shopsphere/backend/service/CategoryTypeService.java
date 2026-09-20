package com.shopsphere.backend.service;

import com.shopsphere.backend.dto.request.CategoryTypeRequest;
import com.shopsphere.backend.dto.response.CategoryTypeResponse;

import java.util.List;
import java.util.UUID;

public interface CategoryTypeService {
    CategoryTypeResponse create(CategoryTypeRequest request);

    CategoryTypeResponse getById(UUID id);

    List<CategoryTypeResponse> getAll(UUID categoryId);

    CategoryTypeResponse update(UUID id, CategoryTypeRequest request);

    void delete(UUID id);
}

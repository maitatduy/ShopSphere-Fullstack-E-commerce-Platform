package com.shopsphere.backend.service;

import com.shopsphere.backend.dto.request.ProductRequest;
import com.shopsphere.backend.dto.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ProductService {
    ProductResponse create(ProductRequest request);

    ProductResponse getById(UUID id);

    Page<ProductResponse> getAll(String keyword, UUID categoryId, Pageable pageable);

    ProductResponse update(UUID id, ProductRequest request);

    void delete(UUID id);
}

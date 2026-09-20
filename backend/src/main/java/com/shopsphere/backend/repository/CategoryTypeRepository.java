package com.shopsphere.backend.repository;

import com.shopsphere.backend.entity.CategoryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryTypeRepository extends JpaRepository<CategoryType, UUID> {
    Page<CategoryType> findByCategoryId(UUID categoryId, Pageable pageable);
}


package com.shopsphere.backend.repository;

import com.shopsphere.backend.entity.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CategoryTypeRepository extends JpaRepository<CategoryType, UUID> {
    List<CategoryType> findByCategoryId(UUID categoryId);
}


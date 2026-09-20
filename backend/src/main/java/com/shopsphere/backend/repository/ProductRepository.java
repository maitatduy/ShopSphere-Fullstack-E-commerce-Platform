package com.shopsphere.backend.repository;

import com.shopsphere.backend.entity.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID>, JpaSpecificationExecutor<Product> {
    @EntityGraph(attributePaths = {"category", "categoryType", "variants"})
    Optional<Product> findWithVariantsById(UUID id);

    boolean existsBySlug(String slug);
}

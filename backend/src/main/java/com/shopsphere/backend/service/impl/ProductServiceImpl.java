package com.shopsphere.backend.service.impl;

import com.shopsphere.backend.dto.request.ProductRequest;
import com.shopsphere.backend.dto.request.ProductVariantRequest;
import com.shopsphere.backend.dto.response.ProductResponse;
import com.shopsphere.backend.entity.Category;
import com.shopsphere.backend.entity.CategoryType;
import com.shopsphere.backend.entity.Product;
import com.shopsphere.backend.entity.ProductVariant;
import com.shopsphere.backend.exception.ResourceNotFoundException;
import com.shopsphere.backend.mapper.ProductMapper;
import com.shopsphere.backend.repository.CategoryRepository;
import com.shopsphere.backend.repository.CategoryTypeRepository;
import com.shopsphere.backend.repository.ProductRepository;
import com.shopsphere.backend.service.ProductService;
import com.shopsphere.backend.specification.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryTypeRepository categoryTypeRepository;
    private final ProductMapper productMapper;

    @Override
    @Transactional
    public ProductResponse create(ProductRequest request) {
        Category category = getCategoryOrThrow(request.getCategoryId());
        CategoryType categoryType = getCategoryTypeOrThrow(request.getCategoryTypeId());

        Product product = productMapper.toEntity(request, category, categoryType);

        if (request.getVariants() != null) {
            List<ProductVariant> variants = request.getVariants().stream()
                    .map(v -> ProductVariant.builder()
                            .color(v.getColor())
                            .size(v.getSize())
                            .stockQuantity(v.getStockQuantity())
                            .product(product)
                            .build())
                    .collect(Collectors.toList());
            product.setVariants(variants);
        }

        Product saved = productRepository.save(product);
        return productMapper.toResponse(saved);
    }

    @Override
    public ProductResponse getById(UUID id) {
        Product product = productRepository.findWithVariantsById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sản phẩm không tồn tại: " + id));
        return productMapper.toResponse(product);
    }

    @Override
    public Page<ProductResponse> getAll(String keyword, UUID categoryId, Pageable pageable) {
        Specification<Product> spec = ProductSpecification.hasKeyword(keyword)
                .and(ProductSpecification.hasCategoryId(categoryId));

        return productRepository.findAll(spec, pageable)
                .map(productMapper::toResponse);
    }

    @Override
    @Transactional
    public ProductResponse update(UUID id, ProductRequest request) {
        Product product = productRepository.findWithVariantsById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sản phẩm không tồn tại: " + id));

        Category category = getCategoryOrThrow(request.getCategoryId());
        CategoryType categoryType = getCategoryTypeOrThrow(request.getCategoryTypeId());

        productMapper.updateEntityFromRequest(product, request, category, categoryType);

        if (request.getVariants() != null) {
            syncVariants(product, request.getVariants());
        }

        return productMapper.toResponse(product);
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Sản phẩm không tồn tại: " + id);
        }
        productRepository.deleteById(id);
    }

    private Category getCategoryOrThrow(UUID categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Danh mục không tồn tại: " + categoryId));
    }

    private CategoryType getCategoryTypeOrThrow(UUID categoryTypeId) {
        return categoryTypeRepository.findById(categoryTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Loại danh mục không tồn tại: " + categoryTypeId));
    }

    private void syncVariants(Product product, List<ProductVariantRequest> requestVariants) {
        Map<UUID, ProductVariant> existingById = product.getVariants().stream()
                .filter(v -> v.getId() != null)
                .collect(Collectors.toMap(ProductVariant::getId, v -> v));

        List<ProductVariant> updatedList = new ArrayList<>();

        for (ProductVariantRequest vr : requestVariants) {
            if (vr.getId() != null && existingById.containsKey(vr.getId())) {
                ProductVariant existing = existingById.get(vr.getId());
                existing.setColor(vr.getColor());
                existing.setSize(vr.getSize());
                existing.setStockQuantity(vr.getStockQuantity());
                updatedList.add(existing);
            } else {
                updatedList.add(ProductVariant.builder()
                        .color(vr.getColor())
                        .size(vr.getSize())
                        .stockQuantity(vr.getStockQuantity())
                        .product(product)
                        .build());
            }
        }

        product.getVariants().clear();
        product.getVariants().addAll(updatedList);
    }
}

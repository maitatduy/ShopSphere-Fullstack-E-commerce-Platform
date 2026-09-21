package com.shopsphere.backend.service.impl;


import com.shopsphere.backend.dto.request.CategoryRequest;
import com.shopsphere.backend.dto.response.CategoryResponse;
import com.shopsphere.backend.entity.Category;
import com.shopsphere.backend.exception.ConflictException;
import com.shopsphere.backend.exception.ResourceNotFoundException;
import com.shopsphere.backend.mapper.CategoryMapper;
import com.shopsphere.backend.repository.CategoryRepository;
import com.shopsphere.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    @Transactional
    public CategoryResponse create(CategoryRequest request) {
        Category category = categoryMapper.toEntity(request);
        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    @Override
    public CategoryResponse getById(UUID id) {
        Category category = getOrThrow(id);
        return categoryMapper.toResponse(category);
    }

    @Override
    public Page<CategoryResponse> getAll(Pageable pageable) {
        return categoryRepository.findAll(pageable).map(categoryMapper::toResponse);
    }

    @Override
    @Transactional
    public CategoryResponse update(UUID id, CategoryRequest request) {
        Category category = getOrThrow(id);
        categoryMapper.updateEntityFromRequest(category, request);
        return categoryMapper.toResponse(category);
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        Category category = getOrThrow(id);

        // Chặn xóa nếu còn CategoryType hoặc Product bên trong, tránh cascade xóa nhầm hàng loạt
        if (!category.getCategoryTypes().isEmpty()) {
            throw new ConflictException(
                    "Không thể xóa Category vì còn " + category.getCategoryTypes().size()
                            + " CategoryType bên trong. Hãy xóa/chuyển CategoryType trước.");
        }
        if (!category.getProducts().isEmpty()) {
            throw new ConflictException(
                    "Không thể xóa Category vì còn " + category.getProducts().size()
                            + " Product đang thuộc category này.");
        }

        categoryRepository.delete(category);
    }

    private Category getOrThrow(UUID id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category không tồn tại: " + id));
    }
}

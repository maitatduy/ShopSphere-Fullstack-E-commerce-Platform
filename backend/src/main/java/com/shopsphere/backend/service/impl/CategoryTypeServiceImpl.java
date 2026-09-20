package com.shopsphere.backend.service.impl;


import com.shopsphere.backend.dto.request.CategoryTypeRequest;
import com.shopsphere.backend.dto.response.CategoryTypeResponse;
import com.shopsphere.backend.entity.Category;
import com.shopsphere.backend.entity.CategoryType;
import com.shopsphere.backend.exception.ConflictException;
import com.shopsphere.backend.exception.ResourceNotFoundException;
import com.shopsphere.backend.mapper.CategoryMapper;
import com.shopsphere.backend.repository.CategoryRepository;
import com.shopsphere.backend.repository.CategoryTypeRepository;
import com.shopsphere.backend.service.CategoryTypeService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryTypeServiceImpl implements CategoryTypeService {

    private final CategoryTypeRepository categoryTypeRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    @Transactional
    public CategoryTypeResponse create(CategoryTypeRequest request) {
        Category category = getCategoryOrThrow(request.getCategoryId());
        CategoryType categoryType = categoryMapper.toEntity(request, category);
        return categoryMapper.toResponse(categoryTypeRepository.save(categoryType));
    }

    @Override
    public CategoryTypeResponse getById(UUID id) {
        return categoryMapper.toResponse(getOrThrow(id));
    }

    @Override
    public List<CategoryTypeResponse> getAll(UUID categoryId) {
        List<CategoryType> types = categoryId != null
                ? categoryTypeRepository.findByCategoryId(categoryId)
                : categoryTypeRepository.findAll();
        return types.stream().map(categoryMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CategoryTypeResponse update(UUID id, CategoryTypeRequest request) {
        CategoryType categoryType = getOrThrow(id);
        Category category = getCategoryOrThrow(request.getCategoryId());
        categoryMapper.updateEntityFromRequest(categoryType, request, category);
        return categoryMapper.toResponse(categoryType);
    }

    @Override
    @Transactional
    public void delete(UUID id) {
        CategoryType categoryType = getOrThrow(id);

        // Chặn xóa nếu còn Product đang tham chiếu tới CategoryType này
        if (!categoryType.getProducts().isEmpty()) {
            throw new ConflictException(
                    "Không thể xóa CategoryType vì còn " + categoryType.getProducts().size()
                            + " Product đang thuộc CategoryType này.");
        }

        categoryTypeRepository.delete(categoryType);
    }

    private CategoryType getOrThrow(UUID id) {
        return categoryTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CategoryType không tồn tại: " + id));
    }

    private Category getCategoryOrThrow(UUID categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category không tồn tại: " + categoryId));
    }
}

package com.shopsphere.backend.controller;

import com.shopsphere.backend.dto.request.CategoryTypeRequest;
import com.shopsphere.backend.dto.response.ApiResponse;
import com.shopsphere.backend.dto.response.CategoryTypeResponse;
import com.shopsphere.backend.service.CategoryTypeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/category-types")
@RequiredArgsConstructor
@Tag(name = "CategoryType", description = "CRUD API cho loại danh mục")
public class CategoryTypeController {
    private final CategoryTypeService categoryTypeService;

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryTypeResponse>> create(@Valid @RequestBody CategoryTypeRequest request) {
        CategoryTypeResponse response = categoryTypeService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED.value(), "Tạo loại danh mục thành công", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryTypeResponse>> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(categoryTypeService.getById(id)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<CategoryTypeResponse>>> getAll(
            @RequestParam(required = false) UUID categoryId,
            Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(categoryTypeService.getAll(categoryId, pageable)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryTypeResponse>> update(@PathVariable UUID id, @Valid @RequestBody CategoryTypeRequest request) {
        return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK.value(), "Cập nhật loại danh mục thành công",
                categoryTypeService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        categoryTypeService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK.value(), "Xóa loại danh mục thành công"));
    }
}

package com.shopsphere.backend.controller;

import com.shopsphere.backend.dto.request.ProductRequest;
import com.shopsphere.backend.dto.response.ApiResponse;
import com.shopsphere.backend.dto.response.ProductResponse;
import com.shopsphere.backend.service.ProductService;
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
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@Tag(name = "Product", description = "CRUD API cho sản phẩm")
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponse>> create(@Valid @RequestBody ProductRequest request) {
        ProductResponse response = productService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(HttpStatus.CREATED.value(), "Tạo sản phẩm thành công", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(ApiResponse.success(productService.getById(id)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductResponse>>> getAll(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) UUID categoryId,
            Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success(productService.getAll(keyword, categoryId, pageable)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> update(@PathVariable UUID id, @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK.value(), "Cập nhật sản phẩm thành công",
                productService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable UUID id) {
        productService.delete(id);
        return ResponseEntity.ok(ApiResponse.success(HttpStatus.OK.value(), "Xóa sản phẩm thành công"));
    }
}
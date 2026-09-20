package com.shopsphere.backend.dto.request;


import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductRequest {
    @NotBlank(message = "Thương hiệu không được để trống")
    private String brand;

    private String description;

    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String name;

    @NotNull(message = "Giá sản phẩm không được để trống")
    @DecimalMin(value = "0.0", inclusive = true, message = "Giá sản phẩm phải lớn hơn hoặc bằng 0")
    private BigDecimal price;

    private Boolean isNewArrival;

    private String slug;

    @NotNull(message = "Mã danh mục không được để trống")
    private UUID categoryId;

    @NotNull(message = "Mã loại danh mục không được để trống")
    private UUID categoryTypeId;

    @Valid
    private List<ProductVariantRequest> variants;
}

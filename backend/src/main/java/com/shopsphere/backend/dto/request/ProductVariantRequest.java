package com.shopsphere.backend.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariantRequest {
    private UUID id;

    @NotBlank(message = "Màu không được để trống")
    private String color;

    @NotBlank(message = "Kích thước không được để trống")
    private String size;

    @Min(value = 0, message = "Số lượng hàng tồn kho phải lớn hơn 0")
    private int stockQuantity;
}

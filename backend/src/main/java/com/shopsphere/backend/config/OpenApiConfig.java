package com.shopsphere.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI shopSphereOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("ShopSphere Backend API")
                        .description("API cho hệ thống ShopSphere - quản lý product, category, order...")
                        .version("v0.0.1")
                        .contact(new Contact().name("github.com/maitatduy")));
    }
}

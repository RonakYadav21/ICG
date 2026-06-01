package com.Admin_Service.client;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "TEMPLATE-SERVICE")
public interface TemplateFeignClient {

    @GetMapping("/templates/dashboard-stats")
    Map<String, Long> getTemplateStats();
}
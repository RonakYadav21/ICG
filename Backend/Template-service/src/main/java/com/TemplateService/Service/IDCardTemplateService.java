package com.TemplateService.Service;


import org.springframework.stereotype.Service;

import com.TemplateService.DTO.TemplateRequestDTO;
import com.TemplateService.Entity.IDCardTemplate;
import com.TemplateService.Repository.IDCardTemplateRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class IDCardTemplateService {

    private final IDCardTemplateRepository templateRepository;
    private final ObjectMapper objectMapper = new ObjectMapper(); // ✅ add this

    public IDCardTemplateService(IDCardTemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    public IDCardTemplate createTemplate(IDCardTemplate template) {
        return templateRepository.save(template);
    }

    public List<IDCardTemplate> getAllTemplates() {
        return templateRepository.findAll();
    }

    public Optional<IDCardTemplate> getTemplateById(Long id) {
        return templateRepository.findById(id);
    }

    public IDCardTemplate updateTemplate(Long id, IDCardTemplate updated) {
        return templateRepository.findById(id)
                .map(existing -> {
                    existing.setName(updated.getName());
                    existing.setWidth(updated.getWidth());
                    existing.setHeight(updated.getHeight());
                    existing.setElementsJson(updated.getElementsJson());
                    existing.setMeta(updated.getMeta());
                    return templateRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Template not found"));
    }

    public void deleteTemplate(Long id) {
        templateRepository.deleteById(id);
    }
    public IDCardTemplate saveTemplate(TemplateRequestDTO dto) {
        try {
//            // Convert JSON string to Map
//            Map<String, Object> elementsMap = objectMapper.readValue(
//                    dto.getElementsJson(), Map.class);
//
//            Map<String, Object> metaMap = objectMapper.readValue(
//                    dto.getMeta(), Map.class);

            IDCardTemplate template = IDCardTemplate.builder()
                    .name(dto.getName())
                    .width(dto.getWidth())
                    .height(dto.getHeight())
                    .backgroundColor(dto.getBackgroundColor())
                    .borderColor(dto.getBorderColor())
                    .borderWidth(dto.getBorderWidth())
                    .elementsJson(dto.getElementsJson())
                    .meta(dto.getMeta())
                    .build();
            System.out.println(template);
            System.out.println(dto.getElementsJson());
            
            return templateRepository.save(template);

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse JSON fields: " + e.getMessage(), e);
        }
    }
}
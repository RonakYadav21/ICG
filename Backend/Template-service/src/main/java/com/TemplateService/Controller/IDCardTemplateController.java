package com.TemplateService.Controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.TemplateService.DTO.FilledTemplateDTO;
import com.TemplateService.DTO.TemplateRequestDTO;
import com.TemplateService.Entity.IDCardTemplate;
import com.TemplateService.Repository.IDCardTemplateRepository;
import com.TemplateService.Service.IDCardTemplateService;
import com.TemplateService.Service.TemplateFillerService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/templates")
public class IDCardTemplateController {

    private final IDCardTemplateService templateService;
     private final TemplateFillerService fillerService;
     private final IDCardTemplateRepository templateRepository;

    public IDCardTemplateController(IDCardTemplateService templateService, TemplateFillerService fillerService,IDCardTemplateRepository templateRepository) {
        this.templateService = templateService;
        this.fillerService = fillerService;
        this.templateRepository=templateRepository;
    }

    @PostMapping
    public IDCardTemplate createTemplate(@RequestBody IDCardTemplate template) {
        return templateService.createTemplate(template);
    }

    @GetMapping
    public List<IDCardTemplate> getAllTemplates() {
        return templateService.getAllTemplates();
    }

    @GetMapping("/{id}")
    public IDCardTemplate getTemplateById(@PathVariable Long id) {
        return templateService.getTemplateById(id)
                .orElseThrow(() -> new RuntimeException("Template not found"));
    }

    @PutMapping("/{id}")
    public IDCardTemplate updateTemplate(@PathVariable Long id, @RequestBody IDCardTemplate updatedTemplate) {
        return templateService.updateTemplate(id, updatedTemplate);
    }
    @DeleteMapping("/{id}")
    public void deleteTemplate(@PathVariable Long id) {
        templateService.deleteTemplate(id);
    }
    // Fill data for all students of a course
    @GetMapping("/{templateId}/fill")
    public List<FilledTemplateDTO> generateForCourse(
            @PathVariable Long templateId,
            @RequestParam Long courseId) {
        IDCardTemplate template = templateService.getTemplateById(templateId)
                .orElseThrow(() -> new RuntimeException("Template not found"));
        return fillerService.fillTemplateForCourse(template, courseId);
    }
    @PostMapping("/save")
    public ResponseEntity<IDCardTemplate> saveTemplate(@RequestBody TemplateRequestDTO dto) {
        IDCardTemplate savedTemplate = templateService.saveTemplate(dto);
        return ResponseEntity.ok(savedTemplate);
    }
    

    @GetMapping("/dashboard-stats")
    public Map<String, Long> getDashboardStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("totalTemplates",
                templateRepository.count());

        return stats;
    }
}

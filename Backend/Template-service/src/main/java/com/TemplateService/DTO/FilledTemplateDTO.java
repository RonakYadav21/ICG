package com.TemplateService.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilledTemplateDTO {
    private Long studentId;
    private String filledTemplateJson; // Template with placeholders replaced
}

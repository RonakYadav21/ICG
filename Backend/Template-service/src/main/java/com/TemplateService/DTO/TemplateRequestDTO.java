package com.TemplateService.DTO;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class TemplateRequestDTO {
    private String name;
    private Integer width;
    private Integer height;
    private String backgroundColor;
    private String borderColor;
    private Integer borderWidth;

    // JSON from frontend editor (fabric.js or similar)
    private String elementsJson;

    // Meta info (college, createdBy, etc.)
    private String meta;
}

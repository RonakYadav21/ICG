package com.TemplateService.Entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.Map;
import com.TemplateService.convertor.JsonConverter;
@Entity
@Table(name = "id_card_templates")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IDCardTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer width;
    private Integer height;
    private String backgroundColor;
    private String borderColor;
    private Integer borderWidth;
    // ✅ Keep only this one for JSONB
//    @Column(name = "elements_json", columnDefinition = "jsonb")
//    @Convert(converter = JsonConverter.class)
    @Column(columnDefinition = "TEXT")
    private String elementsJson;
    
    @Column(columnDefinition = "TEXT")
//    @Convert(converter = JsonConverter.class)
    private String meta;
}
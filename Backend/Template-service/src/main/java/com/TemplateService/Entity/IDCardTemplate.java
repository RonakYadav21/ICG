package com.TemplateService.Entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.Map;
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
  
    @Column(columnDefinition = "TEXT")
    private String elementsJson;
    
    @Column(columnDefinition = "TEXT")
    private String meta;
}
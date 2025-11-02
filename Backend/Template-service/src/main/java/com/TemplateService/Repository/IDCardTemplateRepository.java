package com.TemplateService.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.TemplateService.Entity.IDCardTemplate;

public interface IDCardTemplateRepository extends JpaRepository<IDCardTemplate, Long> {
}

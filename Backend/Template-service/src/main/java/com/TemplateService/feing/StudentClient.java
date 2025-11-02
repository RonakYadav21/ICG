package com.TemplateService.feing;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.TemplateService.DTO.StudentDTO;

import java.util.List;

@FeignClient(name = "STUDENT-SERVICE")
public interface StudentClient {

    @GetMapping("/students/{id}")
    StudentDTO getStudentById(@PathVariable("id") Long id);

    @GetMapping("/students/by-course/{courseId}")
    List<StudentDTO> getStudentsByCourse(@PathVariable("courseId") Long courseId);
}

package com.TemplateService.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TemplateService.Entity.Course;
import com.TemplateService.Service.CourseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/templates")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping("/allcourse")
    public ResponseEntity<List<Course>> getAllCourses() {

        return ResponseEntity.ok(
                courseService.getAllCourses()
        );
    }

    @GetMapping("/{course_id}")
    public ResponseEntity<?> getCourseByCourseId(
            @PathVariable String course_id) {

        return courseService
                .getCourseByCourseId(course_id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    @PostMapping("/addcourse")
    public ResponseEntity<Course> addCourse(
            @RequestBody Course course) {

        Course savedCourse =
                courseService.addCourse(course);

        return ResponseEntity.ok(savedCourse);
    }
}
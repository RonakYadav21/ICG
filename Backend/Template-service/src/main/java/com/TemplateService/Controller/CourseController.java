package com.TemplateService.Controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TemplateService.Entity.Course;
import com.TemplateService.Service.CourseService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/templates")
@RequiredArgsConstructor
public class CourseController {
	  private final CourseService courseService;
	    //  Get all courses
	    @GetMapping("/all")
	    public ResponseEntity<List<Course>> getAllCourses() {
	        return ResponseEntity.ok(courseService.getAllCourses());
	    }
//	     Get course by course_id
	    @GetMapping("/{course_id}")
	    public ResponseEntity<?> getCourseByCourseId(@PathVariable String course_id) {
	        return courseService.getCourseByCourseId(course_id)
	                .map(ResponseEntity::ok)
	                .orElse(ResponseEntity.notFound().build());
	    }
	    @PostMapping("/add")
	    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
	        Course savedCourse = courseService.addCourse(course);
	        return ResponseEntity.ok(savedCourse);
	    }
	    
}

package com.TemplateService.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.TemplateService.Entity.Course;
import com.TemplateService.Repository.CourseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseByCourseId(String course_id) {
        return courseRepository.findByCourseId(course_id);
    }
    
    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }
}
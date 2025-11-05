package com.TemplateService.Repository;


import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import com.TemplateService.Entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findByCourseId(String courseId);
}

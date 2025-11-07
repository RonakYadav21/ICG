package com.Student_service.Service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.Student_service.Entity.Student;
import com.Student_service.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student registerStudent(Student student) {
//        student.setStatus("Pending");		
//        student.setDigitalCardUrl("");
    	System.out.println(student);
        return studentRepository.save(student);
    }

    public boolean isStudentRegistered(String email) {
        return studentRepository.findByEmailAddress(email).isPresent();
    }

    public List<Student> getStudentsByCourse(String course) {
        return studentRepository.findByProgramNameIgnoreCase(course);
    }

	public List<Student> getStudentsByCourseId(Long courseId) {
		// TODO Auto-generated method stub
		return studentRepository.findByCourseId(courseId);
				}
	
}

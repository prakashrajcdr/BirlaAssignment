package com.prakash.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prakash.entity.StudentMaster;
import com.prakash.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
	StudentRepository studentRepository;
	
	public StudentMaster addStudent(StudentMaster newStudent) {
		StudentMaster student = null;
		
		System.out.println("student - " + newStudent.toString());
		student = studentRepository.save(newStudent);
		return student;
	}

	public StudentMaster updateStudent(Integer studentId, StudentMaster updatableStudent) {
		StudentMaster student = null;
		
		student = studentRepository.findById(studentId).get();
		
		student.setName(updatableStudent.getName());
		student.setDiscipline(updatableStudent.getDiscipline());
		student.setGender(updatableStudent.getGender());
		student.setCourses(updatableStudent.getCourses());
			
		return student;
	}

	public StudentMaster getStudent(Integer studentId) {
		StudentMaster student = null;
		
		student = studentRepository.findById(studentId).get();			
		return student;
	}

	public List<StudentMaster> getAllStudent() {
		List<StudentMaster> allStudents = null;
		
		allStudents = studentRepository.findAll();		
		return allStudents;
	}

}

package com.prakash.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prakash.entity.StudentMaster;
import com.prakash.service.StudentService;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class StudentController {
	
	@Autowired
	StudentService studentService;
	
	@PostMapping("/addStudent")
	public ResponseEntity<StudentMaster> addStudent(@RequestBody StudentMaster student) {
		StudentMaster persistedStudent = studentService.addStudent(student);
		return new ResponseEntity<>(persistedStudent, HttpStatus.CREATED);
	}

	@PutMapping("/updateStudent/{id}")
	public ResponseEntity<StudentMaster> updateStudent(@PathVariable("id") Integer studentId, @RequestBody StudentMaster student) {
		StudentMaster updatedStudent = studentService.updateStudent(studentId, student);
		return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
	}
	
	@GetMapping("/getStudent/{id}")
	public ResponseEntity<StudentMaster> getStudent(@PathVariable("id") Integer studentId) {
		StudentMaster student = studentService.getStudent(studentId);
		return new ResponseEntity<>(student, HttpStatus.OK);
	}

	@GetMapping("/getAllStudent")
	public ResponseEntity<List<StudentMaster>> getAllStudent() {
		List<StudentMaster> allStudents = studentService.getAllStudent();
		return new ResponseEntity<>(allStudents, HttpStatus.OK);
	}

}

package com.prakash.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prakash.entity.StudentMaster;

@Repository
public interface StudentRepository extends JpaRepository<StudentMaster, Integer>{

}

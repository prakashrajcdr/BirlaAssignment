package com.prakash.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prakash.entity.CourseMaster;

@Repository
public interface CourseRepository extends JpaRepository<CourseMaster, Integer> {

}

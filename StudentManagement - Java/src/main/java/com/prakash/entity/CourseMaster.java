package com.prakash.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "course_master")
@SequenceGenerator(name = "courseSeq", initialValue = 1, allocationSize = 1, sequenceName = "courseSeq")
public class CourseMaster {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "courseSeq")
	private Integer id;
	private String name;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public String toString() {
		return "CourseMaster [id=" + id + ", name=" + name + "]";
	}


}

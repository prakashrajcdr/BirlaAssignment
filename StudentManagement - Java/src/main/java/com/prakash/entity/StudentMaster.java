package com.prakash.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "student_master")
@SequenceGenerator(name = "studentSeq", initialValue = 1, allocationSize = 1, sequenceName = "studentSeq")
public class StudentMaster {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "studentSeq")
	private Integer id;
	private String name;
	private String discipline;
	private String gender;
	@OneToMany(targetEntity = CourseMaster.class, cascade = CascadeType.ALL)
	@JoinColumn(name = "student_id", referencedColumnName = "id")
	private List<CourseMaster> courses = new ArrayList<>();

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

	public String getDiscipline() {
		return discipline;
	}

	public void setDiscipline(String discipline) {
		this.discipline = discipline;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public List<CourseMaster> getCourses() {
		return courses;
	}

	public void setCourses(List<CourseMaster> courses) {
		this.courses = courses;
	}

	@Override
	public String toString() {
		return "StudentMaster [id=" + id + ", name=" + name + ", discipline=" + discipline + ", gender=" + gender
				+ ", courses=" + courses + "]";
	}
	
}

import { useState, useEffect } from "react";
import { Button, Navbar, Container, Row, Col, Nav, Form, Table } from "react-bootstrap";
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function AllStudents(){
    const commonUrl = 'http://localhost:8080/api';
    const [students, setStudents] = useState([]);

    const getStudents = () => {
        
        fetch(commonUrl+'/getAllStudent')
        .then(data => data.json())
        .then(res => {
            setStudents(res);
        })
        .catch(err => alert(err));
    }

    useEffect(() => {
        getStudents();
    }, []);
    return <>
        <Form>
            <Table>
                <thead>
                    <tr>
                        <th>S.NO</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Discipline</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {  
                        students.length > 0? 
                        students.map((student,index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.gender}</td>
                                <td>{student.discipline}</td>
                                <td>{student.courses.length > 0 ? student.courses.map(course => course.name).join(', ') : ''}</td>
                                <td>
                                    <Button variant="danger" className="mr-2"><FaTrash /></Button>
                                    <Button variant="info"><FaEdit /></Button>
                                </td>
                            </tr>
                        }) 
                        : <span className="justify-content-center">Loading...</span>
                    }
                </tbody>

            </Table>
        </Form>
    </>;
}
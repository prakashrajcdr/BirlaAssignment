import { Button, Navbar, Container, Row, Col, Nav } from "react-bootstrap";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import StudentInput from "./StudentInput";
import AllStudents from "./AllStudents";
import Reports from "./Reports";
import { FaUser } from 'react-icons/fa';

export default function Main(){
    return <>
        <Navbar bg='dark' variant='dark' className="bg-body-tertiary">
            <Container>
            <Navbar.Brand>Student Project</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Button variant="success" className="mr-1"><FaUser /></Button>
                <Button variant="danger">Logout</Button>
            </Navbar.Collapse>
            </Container>
        </Navbar>
        <Container className="mt-3">
            <Row>
                <Col sm={2} md={2}>
                    <Container className="">
                        <Row className="bg-dark text-light p-1 mb-1 justify-content-center">Menu</Row>
                        <Nav defaultActiveKey="/new-student" className="flex-column">
                            <Nav.Link className="text-decoration-none text-dark" as={Link} to="/new-student">New Students</Nav.Link>
                            <Nav.Link className="text-decoration-none text-dark" as={Link} to="/all-students">All Students</Nav.Link>
                            <Nav.Link className="text-decoration-none text-dark" as={Link} to="/reports">Reports</Nav.Link>
                        </Nav>

                    </Container>
                </Col>
                <Col sm={10} md={10}>
                    <Routes>
                        <Route path='/' element={<StudentInput />}/>
                        <Route path='/new-student' element={<StudentInput />}/>
                        <Route path='/all-students' element={<AllStudents />}/>
                        <Route path='/reports' element={<Reports />}/>
                        <Route path='*' element={<Navigate to='/' />}/>
                    </Routes>
                </Col>
            </Row>
        </Container>
    </>;
}
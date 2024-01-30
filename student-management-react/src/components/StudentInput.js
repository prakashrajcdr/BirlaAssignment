import { useEffect, useState } from "react";
import { Button, Navbar, Container, Row, Col, Nav, Form } from "react-bootstrap";


export default function StudentInput(){

    const defaultStudent = {name : '', discipline: 'CSE', gender : '', courses : []};
    const [student, setStudent] = useState(defaultStudent);
    const commonUrl = 'http://localhost:8080/api';
    const [isSubmit, setSubmit] = useState(false);

    function setCourseValue(target){
        const name = target.name;
        const value = target.value;
        const checkBoxValue = { name : value};
        if(target.checked){
            setStudent(previousStudent =>  { 
                const courseList = previousStudent[name] ? [...previousStudent[name], checkBoxValue] : [checkBoxValue];
                return { ...previousStudent, [name] : courseList}
            });
        } else {
            setStudent(previousStudent => {
                const courseList = previousStudent[name] ? previousStudent[name] : [];
                return {...previousStudent, [name] : courseList.filter(course => course.name && course.name != value) };
            });
        }
    }

    function onChangeHandler(event){
        const name = event.target.name;
        const value = event.target.value;
        if(event.target.type == 'checkbox'){
            setCourseValue(event.target);
        } else {
            setStudent(previousStudent => { return {...previousStudent, [name] : value}});
        }
    }

    function submitForm(event){
        event.preventDefault();
        setSubmit(true);
    }

    function addStudentApiCall(){
        fetch(commonUrl+'/addStudent', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(student)
        })
        .then(data => data.json())
        .then(res => {
            console.log('response - ', res);
        })
        .catch(err => {
            console.error('error - ', err);
            alert(err);
        });

    }
    useEffect(() => {
        if(isSubmit){
            addStudentApiCall();
        }
        setSubmit(false);
    }, [isSubmit]);

    return <div className="pl-2">
        <h2 >Student Input Form</h2>
        <hr/>
        <Form onSubmit={submitForm}>
            <Container>
                <Row className="mt-3">
                    <Col>
                        <Form.Group controlId='nameControl'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder="Enter Name" name="name" onChange={onChangeHandler}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='disciplineControl'>
                            <Form.Label>Discipline</Form.Label>
                            <Form.Control as='select' name='discipline' onChange={onChangeHandler}>
                                <option value='CSE'>CSE</option>
                                <option value='MECHANICAL'>MECHANICAL</option>
                                <option value='IT'>IT</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Form.Group controlId='genderControl'>
                            <Form.Label>Gender</Form.Label>
                            <Form.Check type='radio' name='gender' label='Male' value='Male' onChange={onChangeHandler} id='gender-male' />
                            <Form.Check type='radio' name='gender' label='Female' value='Female' onChange={onChangeHandler} id='gender-female'/>
                            <Form.Check type='radio' name='gender' label='Others' value='Others' onChange={onChangeHandler} id='gender-others'/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='courseControl'>
                            <Form.Label>Course</Form.Label>
                            <Form.Check type='checkbox' name='courses' label='Mathematics' onChange={onChangeHandler} value='Mathematics' id='course-mathematics'/>
                            <Form.Check type='checkbox' name='courses' label='Science' onChange={onChangeHandler} value='Science' id='course-science'/>
                            <Form.Check type='checkbox' name='courses' label='English' onChange={onChangeHandler} value='English' id='course-english'/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Button variant='warning' type="submit">Add Student</Button>
                </Row>

            </Container>
        </Form>
    </div>;
}
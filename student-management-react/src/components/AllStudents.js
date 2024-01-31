import { useState, useEffect } from "react";
import { Button, Navbar, Container, Row, Col, Nav, Form, Table, Modal, Toast } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

export default function AllStudents(){
    const commonUrl = 'http://localhost:8080/api';
    const [students, setStudents] = useState([]);
    const [showDeleteBox,  setShowDeleteBox] = useState(false);
    const [deletableStudent, setDeletableStudent] = useState({});
    const [editableIndex, setEditableIndex] = useState(-1);
    const [editableStudent, setEditableStudent] = useState({});
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        getStudents();
    }, []);
    
    const getStudents = () => {
        
        fetch(commonUrl+'/getAllStudent')
        .then(data => data.json())
        .then(res => {
            setStudents(res);
        })
        .catch(err => alert(err));
    }

    const hideDeleteBox = () => {
        setShowDeleteBox(false);
    }

    const openDeleteBox = (index) => {
        setDeletableStudent({...students[index], index});
        setShowDeleteBox(true);
    }

    const deleteStudent = (id, index) => {
        fetch(`${commonUrl}/deleteStudent/${id}`, {
            method : 'DELETE'
        })
        .then(res => {
            hideDeleteBox();
            setStudents(previousStudents => {
                if(index > -1){
                    previousStudents.splice(index, 1);
                }
                return previousStudents;
            });
        })
        .catch(err => alert(err));
    }

    const loadStudent = (index) => {
        setEditableStudent(students[index]);
        setEditableIndex(index);
    }

    function setCourseValue(target){
        const name = target.name;
        const value = target.value;
        const checkBoxValue = { name : value};
        if(target.checked){
            setEditableStudent(previousStudent =>  { 
                const courseList = previousStudent[name] ? [...previousStudent[name], checkBoxValue] : [checkBoxValue];
                return { ...previousStudent, [name] : courseList}
            });
        } else {
            setEditableStudent(previousStudent => {
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
            setEditableStudent(previousStudent => { return {...previousStudent, [name] : value}});
        }
    }

    function editStudentApiCall(index){
        fetch(`${commonUrl}/updateStudent/${editableStudent.id}`, {
            method : 'PUT',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(editableStudent)
        })
        .then(data => data.json())
        .then(res => {
            setStudents(previousStudent => {
                previousStudent[index] = editableStudent;
                return previousStudent;
            });
            setEditableIndex(-1);
            setShowToast(true);
            console.log('response - ', res);
        })
        .catch(err => {
            console.error('error - ', err);
            alert(err);
        });
    }


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
                        students.map((student,index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    { editableIndex === index ?
                                    <Form.Control type='text' placeholder="Enter Name" name="name" value={editableStudent.name} onChange={onChangeHandler}/>
                                    :  student.name}
                                </td>
                                <td>
                                    {editableIndex === index ?
                                    <><Form.Check type='radio' name='gender' label='Male' value='Male' id='gender-male' checked={editableStudent.gender === 'Male'} onChange={onChangeHandler}/>
                                    <Form.Check type='radio' name='gender' label='Female' value='Female' id='gender-female' checked={editableStudent.gender === 'Female'} onChange={onChangeHandler}/>
                                    <Form.Check type='radio' name='gender' label='Others' value='Others' id='gender-others' checked={editableStudent.gender === 'Others'} onChange={onChangeHandler}/></>
                                    : student.gender}
                                </td>
                                <td>
                                    {editableIndex === index ?
                                    <Form.Control as='select' name='discipline' value={editableStudent.discipline} onChange={onChangeHandler}>
                                        <option value='CSE'>CSE</option>
                                        <option value='MECHANICAL'>MECHANICAL</option>
                                        <option value='IT'>IT</option>
                                    </Form.Control>
                                    : student.discipline}
                                </td>
                                <td>
                                    {editableIndex === index ?
                                    <><Form.Check type='checkbox' name='courses' label='Mathematics' value='Mathematics' id='course-mathematics'
                                        checked={editableStudent.courses.map(course => course.name).includes('Mathematics')} onChange={onChangeHandler}/>
                                    <Form.Check type='checkbox' name='courses' label='Science' value='Science' id='course-science' 
                                        checked={editableStudent.courses.map(course => course.name).includes('Science')}  onChange={onChangeHandler}/>
                                    <Form.Check type='checkbox' name='courses' label='English' value='English' id='course-english' 
                                        checked={editableStudent.courses.map(course => course.name).includes('English')}  onChange={onChangeHandler}/></>
                                    : student.courses.length > 0 ? student.courses.map(course => course.name).join(', ') : ''}

                                </td>
                                <td>
                                    {editableIndex === index ?
                                    <><Button variant="danger"  className="mr-2"  onClick={() => setEditableIndex(-1)}><strong>&times;</strong></Button>
                                    <Button variant="success" onClick={() => editStudentApiCall(index)}><FaCheck /></Button></>
                                    : <><Button variant="danger" className="mr-2" onClick={() => openDeleteBox(index)}><FaTrash /></Button>
                                    <Button variant="info" onClick={() => loadStudent(index)}><FaEdit /></Button></>}

                                </td>
                            </tr>
                        }) 
                    }
                </tbody>

            </Table>
            <Modal show={showDeleteBox} onHide={hideDeleteBox} centered backdrop='static' keyboard={false}>
                <Modal.Header>
                    Do you want to delete this Row?
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            ID : {deletableStudent.id}
                        </Row>
                        <Row>
                            Name : {deletableStudent.name}
                        </Row>
                        <Row>
                            Gender : {deletableStudent.gender}
                        </Row>
                        <Row>
                            Discipline : {deletableStudent.discipline}
                        </Row>
                        <Row>
                            Course : {deletableStudent.courses && deletableStudent.courses.length > 0 ? deletableStudent.courses.map(course => course.name).join(', ') : ''}
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => deleteStudent(deletableStudent.id, deletableStudent.index)}>OK</Button>
                    <Button variant="light" onClick={hideDeleteBox}>Cancel</Button>
                </Modal.Footer>

            </Modal>
        </Form>
        <Toast show={showToast} onClose={() => setShowToast(false)} autohide delay={2000} style={{position: 'absolute',top: 0,right: 0, backgroundColor: '#28a745'}}>
            <Toast.Body>You have updated a Student Successfully!</Toast.Body>
        </Toast>

    </>;
}
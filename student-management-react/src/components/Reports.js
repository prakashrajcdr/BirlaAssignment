
import { Button, Navbar, Container, Row, Col, Nav, Form } from "react-bootstrap";

export default function Reports(){
    return <>
        <Form>
            <Form.Group as={Row} controlId="nameControl" className="mb-3">
                <Form.Label  className="sm-2">Name</Form.Label>
                <Col className="sm-10">
                    <Form.Control type='text' placeholder="Enter Name" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="emailControl" className="mb-3">
                <Form.Label  className="md-4">Email</Form.Label>
                <Col className="md-8">
                    <Form.Control type='text' placeholder="Enter Email" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="feedBackControl" className="mb-3">
                <Form.Label  className="md-4">Your Feedback</Form.Label>
                <Col className="md-8">
                    <Form.Control as='textarea' rows={5}></Form.Control>
                </Col>
            </Form.Group>
            <Button variant='primary'>Send Feedback</Button>
            
        </Form>
    </>;
}
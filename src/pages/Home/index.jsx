import React, { useState, useRef } from "react";
import { Button, Container, Form, Col, Row } from "react-bootstrap";
export default function Home(props) {
  const [name, setName] = useState(undefined);
  // const nameRef = useRef();
  async function handleStartButton() {
    try {
      if (name === undefined) {
        throw new Error("name is empty");
      }
      const payload = { name: name };
      const res = await fetch(`${process.env.REACT_APP_API_URL}/exams/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: `${process.env.REACT_APP_ORIGIN}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        let data = await res.json();
        console.log(props);
        props.history.push("/exam", { exam: data });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Row
      className="d-flex justify-content-center"
      style={{
        height: "100vh",
      }}
    >
      <Col
        sm={3}
        className="d-flex justify-content-center flex-column align-items-center"
      >
        <Form className="mx-2">
          <Form.Group controlId="candidateName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter here"
              size="lg"
              onKeyDown={(e) => setName(e.currentTarget.value)}
            ></Form.Control>
            <Form.Text className="text-muted">
              Please use your real name
            </Form.Text>
          </Form.Group>
        </Form>
        <Row>
          <Button
            onClick={() => handleStartButton()}
            size="md"
            variant="outline-primary"
            className="d-flex align-items-center justify-content-center w-100"
          >
            Start
          </Button>
        </Row>
      </Col>
    </Row>
  );
}

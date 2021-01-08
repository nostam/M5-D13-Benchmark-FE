import React from "react";
import { Row, Col } from "react-bootstrap";
export default function questions(props) {
  return (
    <>
      <Row className="my-5">
        <h1>duration: </h1>
      </Row>
      <Row>
        <Col lg={8} md={6}>
          <h2>Question {count + 1}:</h2>
          <h5>{exam.questions[count].text}</h5>
        </Col>
        <Col lg={4} md={6} className="d-flex flex-column">
          {exam.questions[count].answers.map((ans, index) => (
            <Button
              key={`ans${index}`}
              variant={selectedAns === index ? "warning" : "outline-primary"}
              className="my-1"
              onClick={() => setSelectedAns(index)}
            >
              {ans.text}
            </Button>
          ))}
          {!isNaN(selectedAns) && (
            <Button variant="primary" onClick={() => handleSubmitAns()}>
              Submit
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
}

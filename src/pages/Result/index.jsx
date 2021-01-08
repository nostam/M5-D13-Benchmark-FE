import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";

export default function Result(props) {
  // const { id } = props.match.params.id;
  const [result, setResult] = useState();
  async function getResult(id) {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/exams/${id}`, {
        method: "Get",
        headers: {
          Origin: `${process.env.REACT_APP_ORIGIN}`,
        },
      });
      if (res.ok) {
        console.log(res); // prob: avoided data = promises
        const data = await res.json();
        setResult(data);
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => getResult(props.match.params.id), []);

  return (
    <Container>
      {result === undefined ? (
        <h1>Loading</h1>
      ) : (
        <>
          <Row className="d-flex justify-content-between my-5">
            <h1>Result for {result.candidateName}</h1>
            <h2>
              <Badge variant="success" className="mx-2">
                Correct: {result.totalScore}
              </Badge>
              <Badge variant="danger" className="mx-2">
                Incorrect: {result.questions.length - result.totalScore}
              </Badge>
            </h2>
          </Row>
          <h6 className="d-flex justify-content-end">
            <Badge
              variant="success"
              className="ml-1"
              style={{ opacity: "0.9" }}
            >
              Correct Answer
            </Badge>
            <Badge variant="danger" className="ml-1" style={{ opacity: "0.9" }}>
              Incorrect Answer
            </Badge>
            <Badge
              variant="warning"
              className="ml-1"
              style={{ opacity: "0.9" }}
            >
              Your selected Answer
            </Badge>
          </h6>
          {result.questions.map((question, index) => (
            <Row className="mx-2 my-5">
              <Col>
                <h3>Question {index + 1}</h3>
                <p>{question.text}</p>
                <Row className="flex-nowrap justify-content-center">
                  {question.answers.map((ans, index) => (
                    <Button
                      key={`ans${index}`}
                      variant={
                        ans.isCorrect === true
                          ? "success"
                          : question.isSelected === index
                          ? "warning"
                          : "danger"
                      }
                      className="my-1 mx-2 w-25"
                      style={{ opacity: "0.9" }}
                    >
                      {ans.text}
                    </Button>
                  ))}
                </Row>
              </Col>
            </Row>
          ))}
        </>
      )}
    </Container>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";

export default function Exam(props) {
  const { exam } = props.location.state;
  let [count, setCount] = useState(0);
  const [sec, setSec] = useState(0);
  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);

  const [examFinished, setExamFinished] = useState(false);
  const [selectedAns, setSelectedAns] = useState(undefined);
  const payload = { question: count, answer: selectedAns };

  async function handleSubmitAns() {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/exams/${exam._id}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: `${process.env.REACT_APP_ORIGIN}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (count < exam.questions.length) {
        console.log("next question");
        setCount(++count); // count++ cause double click, lifecycle
        setSelectedAns(undefined);
        setSec(0);
      } else {
        setExamFinished(true);
        // props.history.push("/completed", { id: exam._id });
      }
    } catch (error) {
      console.log(error);
    }
  }
  function viewResult() {
    props.history.push(`/result/${exam._id}`);
  }
  function countDown(duration) {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    let remains = duration - sec;

    return remains;
  }
  function questions() {
    return (
      <>
        <Row className="my-5">
          <h1>
            Duration:
            <Badge className="btn-info mx-2">
              {countDown(exam.questions[count].duration)}s
            </Badge>
          </h1>
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

  function result() {
    return (
      <Container className="my-5 d-flex justify-content-center align-items-xl-center">
        <Row className="my-5 mx-auto align-self-center justify-content-center">
          <Col>
            <h4>Congratulations {exam.candidateName}!</h4>
            <Button
              className="align-self-center"
              variant="success"
              onClick={viewResult}
            >
              View Result
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <div>
      {console.log("Q:", count, "A:", selectedAns)}
      <Container>
        {!examFinished && count < 5 ? questions() : result()}
      </Container>
    </div>
  );
}

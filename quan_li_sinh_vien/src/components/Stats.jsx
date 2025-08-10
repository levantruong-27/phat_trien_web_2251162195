import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function Stats({ students }) {
  const total = students.length;
  const majors = new Set(students.map((s) => s.major)).size;

  return (
    <Row className="mt-4">
      <Col>
        <Card bg="primary" text="white" className="text-center">
          <Card.Body>
            <Card.Title>Tổng sinh viên</Card.Title>
            <Card.Text style={{ fontSize: "1.5rem" }}>{total}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card bg="success" text="white" className="text-center">
          <Card.Body>
            <Card.Title>Ngành học</Card.Title>
            <Card.Text style={{ fontSize: "1.5rem" }}>{majors}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

import React from "react";
import { Table, Button } from "react-bootstrap";

export default function StudentList({ students, onDelete, onEdit }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>STT</th>
          <th>Họ tên</th>
          <th>Ngành học</th>
          <th>Email</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {students.map((stu, index) => (
          <tr key={stu.id}>
            <td>{index + 1}</td>
            <td>{stu.name}</td>
            <td>{stu.major}</td>
            <td>{stu.email}</td>
            <td>
              <Button variant="warning" size="sm" onClick={() => onEdit(stu)}>
                Sửa
              </Button>{" "}
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(stu.id)}
              >
                Xóa
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

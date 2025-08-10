import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import Stats from "./components/Stats";
import { seedStudents } from "./data";

export default function App() {
  const [records, setRecords] = useState(seedStudents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const saveRecord = (student) => {
    setRecords((prev) => {
      if (student.id) {
        // Cập nhật sinh viên
        return prev.map((item) =>
          item.id === student.id ? { ...student } : item
        );
      } else {
        // Thêm mới sinh viên
        const newId = prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1;
        const newStt = prev.length
          ? Math.max(...prev.map((p) => p.stt)) + 1
          : 1;
        return [...prev, { ...student, id: newId, stt: newStt }];
      }
    });
    setIsFormOpen(false);
    setCurrentEdit(null);
  };

  const removeRecord = (id) => {
    setRecords((prev) => prev.filter((p) => p.id !== id));
  };

  const startEdit = (student) => {
    setCurrentEdit(student);
    setIsFormOpen(true);
  };

  return (
    <Container className="mt-4">
      <h1>Quản lý sinh viên</h1>

      <Stats students={records} />

      <Button className="mb-3 mt-3" onClick={() => setIsFormOpen(true)}>
        + Thêm sinh viên
      </Button>

      <StudentList
        students={records}
        onDelete={removeRecord}
        onEdit={startEdit}
      />

      <StudentForm
        show={isFormOpen}
        handleClose={() => {
          setIsFormOpen(false);
          setCurrentEdit(null);
        }}
        onSave={saveRecord}
        editingStudent={currentEdit}
      />
    </Container>
  );
}

import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function StudentForm({
  show,
  handleClose,
  onSave,
  editingStudent,
}) {
  const [formValues, setFormValues] = useState({
    name: "",
    major: "",
    email: "",
  });

  useEffect(() => {
    if (editingStudent) {
      setFormValues(editingStudent);
    } else {
      setFormValues({ name: "", major: "", email: "" });
    }
  }, [editingStudent]);

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = () => {
    if (!formValues.name || !formValues.major || !formValues.email) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    onSave(formValues);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editingStudent ? "Sửa sinh viên" : "Thêm sinh viên"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formValues.name}
              onChange={onChangeValue}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ngành học</Form.Label>
            <Form.Control
              type="text"
              name="major"
              value={formValues.major}
              onChange={onChangeValue}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formValues.email}
              onChange={onChangeValue}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={submitForm}>
          {editingStudent ? "Cập nhật" : "Thêm mới"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

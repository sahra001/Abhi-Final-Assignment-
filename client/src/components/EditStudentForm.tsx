import React, { useState, useEffect } from "react";
import { fetchStudentById } from "../services/api";

interface EditStudentFormProps {
  studentId: number;
  onStudentUpdated: (
    id: number,
    updatedData: {
      name: string;
      email: string;
      age: number;
      specializationId: number;
    }
  ) => void;
  onCancel: () => void;
}

const EditStudentForm: React.FC<EditStudentFormProps> = ({ studentId, onStudentUpdated, onCancel }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [age, setAge] = useState<number | "">("");
  const [specializationId, setSpecializationId] = useState<number | "">("");

  useEffect(() => {
    const loadStudent = async () => {
      const student = await fetchStudentById(studentId);
      setName(student.name || "");
      setEmail(student.email || "");
      setAge(student.age || "");
      setSpecializationId(student.specializationId || "");
    };
    loadStudent();
  }, [studentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStudentUpdated(studentId, {
      name,
      email,
      age: Number(age),
      specializationId: Number(specializationId),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit Student</h3>
      <input
        type="text"
        placeholder="Name"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email || ""}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={age !== "" ? age : ""}
        onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
        required
      />
      <input
        type="number"
        placeholder="Specialization ID"
        value={specializationId !== "" ? specializationId : ""}
        onChange={(e) => setSpecializationId(e.target.value ? Number(e.target.value) : "")}
        required
      />
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditStudentForm;

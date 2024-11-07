import React, { useState } from "react";

interface CreateStudentFormProps {
  onStudentAdded: (studentData: {
    name: string;
    email: string;
    age: number;
    specializationId: number;
  }) => void;
}

const CreateStudentForm: React.FC<CreateStudentFormProps> = ({ onStudentAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [specializationId, setSpecializationId] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStudentAdded({
      name,
      email,
      age: Number(age),
      specializationId: Number(specializationId),
    });
    setName("");
    setEmail("");
    setAge("");
    setSpecializationId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Student</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        required
      />
      <input
        type="number"
        placeholder="Specialization ID"
        value={specializationId}
        onChange={(e) => setSpecializationId(Number(e.target.value))}
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default CreateStudentForm;

import React from "react";

export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  specializationId: number;
}

interface StudentsTableProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  onEditStudent: (id: number) => void;
  onDeleteStudent: (id: number) => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({ students, onEditStudent, onDeleteStudent }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length > 0 ? (
          students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <button onClick={() => onEditStudent(student.id)}>Edit</button>
                <button onClick={() => onDeleteStudent(student.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} style={{ textAlign: "center" }}>
              No students found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StudentsTable;

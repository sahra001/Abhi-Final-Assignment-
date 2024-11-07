import React, { useEffect, useState, useMemo } from "react";
import UniversitySelect from "./components/UniversitySelect";
import DepartmentSelect from "./components/DepartmentSelect";
import SpecializationSelect from "./components/SpecializationSelect";
import StudentsTable, { Student } from "./components/StudentsTable";
import CreateStudentForm from "./components/CreateStudentForm";
import EditStudentForm from "./components/EditStudentForm";
import { fetchStudents, fetchUniversities, createStudent, updateStudentById, deleteStudentById } from "./services/api";

interface University {
  id: number;
  name: string;
  departments: Department[];
}

interface Department {
  id: number;
  name: string;
  specializations: Specialization[];
}

interface Specialization {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [universityId, setUniversityId] = useState<number | null>(null);
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [specializationId, setSpecializationId] = useState<number | null>(null);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);

  // Fetch universities and students on initial load
  useEffect(() => {
    const loadData = async () => {
      const allUniversities = await fetchUniversities();
      const allStudents = await fetchStudents();
      setUniversities(allUniversities);
      setStudents(allStudents);

      console.log("Fetched Universities:", allUniversities);
      console.log("Fetched Students:", allStudents);
    };
    loadData();
  }, []);

  // Filter students based on selection
  const filteredStudents = useMemo(() => {
    console.log("Selected University ID:", universityId);
    console.log("Selected Department ID:", departmentId);
    console.log("Selected Specialization ID:", specializationId);
  
    const filtered = students.filter((student) => {
      // Log the student's specializationId to ensure correct matching
      console.log(`Student ID: ${student.id}, Student Specialization ID: ${student.specializationId}`);
  
      // Check specialization match
      if (specializationId) {
        const matchesSpecialization = student.specializationId === specializationId;
        console.log(`Student ${student.id} specialization check:`, matchesSpecialization);
        return matchesSpecialization;
      }
  
      // Check department match
      if (departmentId) {
        const department = universities
          .flatMap((uni) => uni.departments)
          .find((dept) => dept.id === departmentId);
        console.log("Matched Department:", department);
  
        if (!department) {
          console.log("No matching department found.");
          return false;
        }
  
        const matchesDepartment = department.specializations.some(
          (spec) => spec.id === student.specializationId
        );
        console.log(`Student ${student.id} department check:`, matchesDepartment);
        return matchesDepartment;
      }
  
      // Check university match
      if (universityId) {
        const university = universities.find((uni) => uni.id === universityId);
        console.log("Matched University:", university);
  
        if (!university) {
          console.log("No matching university found.");
          return false;
        }
  
        const matchesUniversity = university.departments.some((dept) =>
          dept.specializations.some((spec) => spec.id === student.specializationId)
        );
        console.log(`Student ${student.id} university check:`, matchesUniversity);
        return matchesUniversity;
      }
  
      // If no selection, include all students
      return true;
    });
  
    console.log("Filtered Students after selection:", filtered);
    return filtered;
  }, [students, universityId, departmentId, specializationId, universities]);
  
  // Handle creating a new student
  const handleCreateStudent = async (studentData: {
    name: string;
    email: string;
    age: number;
    specializationId: number;
  }) => {
    const newStudent = await createStudent(studentData);
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  // Handle updating an existing student
  const handleUpdateStudent = async (studentId: number, updatedData: {
    name: string;
    email: string;
    age: number;
    specializationId: number;
  }) => {
    const updatedStudent = await updateStudentById(studentId, updatedData);
    setStudents((prevStudents) =>
      prevStudents.map((student) => (student.id === studentId ? updatedStudent : student))
    );
    setEditingStudentId(null);
  };

  // Handle deleting a student
  const handleDeleteStudent = async (studentId: number) => {
    await deleteStudentById(studentId);
    setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
  };

  return (
    <div className="App">
      <h1>University Students Portal</h1>
      <UniversitySelect 
        universities={universities}
        onChange={(id) => {
          setUniversityId(id);
          setDepartmentId(null);
          setSpecializationId(null);
        }} 
      />
      
      {universityId && (
        <DepartmentSelect 
          universityId={universityId} 
          universities={universities}
          onChange={(id) => {
            setDepartmentId(id);
            setSpecializationId(null);
          }} 
        />
      )}

      {departmentId && (
        <SpecializationSelect 
          departmentId={departmentId} 
          universities={universities}
          onChange={setSpecializationId} 
        />
      )}

      {editingStudentId ? (
        <EditStudentForm 
          studentId={editingStudentId}
          onStudentUpdated={handleUpdateStudent}
          onCancel={() => setEditingStudentId(null)}
        />
      ) : (
        <CreateStudentForm onStudentAdded={handleCreateStudent} />
      )}

      <StudentsTable 
        students={filteredStudents}
        setStudents={setStudents}
        onEditStudent={setEditingStudentId}
        onDeleteStudent={handleDeleteStudent}
      />
    </div>
  );
};

export default App;

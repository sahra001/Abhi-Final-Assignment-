import { Request, Response } from "express";
import AppDataSource from "../config/ormconfig";
import { Student } from "../entities/Student";

// Get all students
export const getStudents = async (req: Request, res: Response) => {
  try {
    const studentRepository = AppDataSource.getRepository(Student);
    const students = await studentRepository.find({
      relations: ["specialization"], // Load specialization relation
    });
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single student by ID
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const studentRepository = AppDataSource.getRepository(Student);
    const student = await studentRepository.findOne({
      where: { id: Number(req.params.id) },
      relations: ["specialization"], // Load specialization relation
    });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const studentRepository = AppDataSource.getRepository(Student);
    const newStudent = studentRepository.create(req.body); // Create a single student instance
    const savedStudent = await studentRepository.save(newStudent); // save() returns the saved entity

    res.status(201).json(savedStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a student
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const studentRepository = AppDataSource.getRepository(Student);
    const student = await studentRepository.findOne({
      where: { id: Number(req.params.id) },
      relations: ["specialization"], // Load specialization relation
    });

    if (student) {
      studentRepository.merge(student, req.body); // Merge the updated data
      const updatedStudent = await studentRepository.save(student); // Save the updated student

      res.json(updatedStudent);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a student
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentRepository = AppDataSource.getRepository(Student);
    const result = await studentRepository.delete(Number(req.params.id));
    if (result.affected) {
      res.json({ message: "Student deleted" });
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

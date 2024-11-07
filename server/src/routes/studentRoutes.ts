import { Router } from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController";

const router = Router();

// GET all students
router.get("/", getStudents);

// GET a student by ID
router.get("/:id", getStudentById);

// POST a new student
router.post("/", createStudent);

// PUT (update) an existing student
router.put("/:id", updateStudent);

// DELETE a student
router.delete("/:id", deleteStudent);

export default router;

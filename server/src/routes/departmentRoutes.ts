import { Router } from "express";
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController";

const router = Router();

// GET all departments
router.get("/", getDepartments);

// GET a department by ID
router.get("/:id", getDepartmentById);

// POST a new department
router.post("/", createDepartment);

// PUT (update) an existing department
router.put("/:id", updateDepartment);

// DELETE a department
router.delete("/:id", deleteDepartment);

export default router;

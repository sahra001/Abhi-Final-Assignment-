import { Router } from "express";
import {
  getUniversities,
  getUniversityById,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} from "../controllers/universityController";

const router = Router();

// GET all universities
router.get("/", getUniversities);

// GET a university by ID
router.get("/:id", getUniversityById);

// POST a new university
router.post("/", createUniversity);

// PUT (update) an existing university
router.put("/:id", updateUniversity);

// DELETE a university
router.delete("/:id", deleteUniversity);

export default router;

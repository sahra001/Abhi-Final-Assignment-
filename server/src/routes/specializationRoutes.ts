import { Router } from "express";
import {
  getSpecializations,
  getSpecializationById,
  createSpecialization,
  updateSpecialization,
  deleteSpecialization,
} from "../controllers/specializationController";

const router = Router();

// GET all specializations
router.get("/", getSpecializations);

// GET a specialization by ID
router.get("/:id", getSpecializationById);

// POST a new specialization
router.post("/", createSpecialization);

// PUT (update) an existing specialization
router.put("/:id", updateSpecialization);

// DELETE a specialization
router.delete("/:id", deleteSpecialization);

export default router;

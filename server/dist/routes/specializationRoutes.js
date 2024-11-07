"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const specializationController_1 = require("../controllers/specializationController");
const router = (0, express_1.Router)();
// GET all specializations
router.get("/", specializationController_1.getSpecializations);
// GET a specialization by ID
router.get("/:id", specializationController_1.getSpecializationById);
// POST a new specialization
router.post("/", specializationController_1.createSpecialization);
// PUT (update) an existing specialization
router.put("/:id", specializationController_1.updateSpecialization);
// DELETE a specialization
router.delete("/:id", specializationController_1.deleteSpecialization);
exports.default = router;

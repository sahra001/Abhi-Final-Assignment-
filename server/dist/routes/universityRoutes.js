"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const universityController_1 = require("../controllers/universityController");
const router = (0, express_1.Router)();
// GET all universities
router.get("/", universityController_1.getUniversities);
// GET a university by ID
router.get("/:id", universityController_1.getUniversityById);
// POST a new university
router.post("/", universityController_1.createUniversity);
// PUT (update) an existing university
router.put("/:id", universityController_1.updateUniversity);
// DELETE a university
router.delete("/:id", universityController_1.deleteUniversity);
exports.default = router;

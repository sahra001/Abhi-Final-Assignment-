"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
const router = (0, express_1.Router)();
// GET all students
router.get("/", studentController_1.getStudents);
// GET a student by ID
router.get("/:id", studentController_1.getStudentById);
// POST a new student
router.post("/", studentController_1.createStudent);
// PUT (update) an existing student
router.put("/:id", studentController_1.updateStudent);
// DELETE a student
router.delete("/:id", studentController_1.deleteStudent);
exports.default = router;

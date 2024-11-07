"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departmentController_1 = require("../controllers/departmentController");
const router = (0, express_1.Router)();
// GET all departments
router.get("/", departmentController_1.getDepartments);
// GET a department by ID
router.get("/:id", departmentController_1.getDepartmentById);
// POST a new department
router.post("/", departmentController_1.createDepartment);
// PUT (update) an existing department
router.put("/:id", departmentController_1.updateDepartment);
// DELETE a department
router.delete("/:id", departmentController_1.deleteDepartment);
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.createDepartment = exports.getDepartmentById = exports.getDepartments = void 0;
const ormconfig_1 = __importDefault(require("../config/ormconfig"));
const Department_1 = require("../entities/Department");
// Get all departments
const getDepartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentRepository = ormconfig_1.default.getRepository(Department_1.Department);
        const departments = yield departmentRepository.find({ relations: ["specializations", "specializations.students"] });
        res.json(departments);
    }
    catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getDepartments = getDepartments;
// Get a single department by ID
const getDepartmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentRepository = ormconfig_1.default.getRepository(Department_1.Department);
        const department = yield departmentRepository.findOne({
            where: { id: Number(req.params.id) },
            relations: ["specializations", "specializations.students"],
        });
        if (department) {
            res.json(department);
        }
        else {
            res.status(404).json({ error: "Department not found" });
        }
    }
    catch (error) {
        console.error("Error fetching department:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getDepartmentById = getDepartmentById;
// Create a new department
const createDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentRepository = ormconfig_1.default.getRepository(Department_1.Department);
        const newDepartment = departmentRepository.create(req.body);
        const savedDepartment = yield departmentRepository.save(newDepartment);
        res.status(201).json(savedDepartment);
    }
    catch (error) {
        console.error("Error creating department:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createDepartment = createDepartment;
// Update a department
const updateDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentRepository = ormconfig_1.default.getRepository(Department_1.Department);
        const department = yield departmentRepository.findOneBy({ id: Number(req.params.id) });
        if (department) {
            departmentRepository.merge(department, req.body);
            const updatedDepartment = yield departmentRepository.save(department);
            res.json(updatedDepartment);
        }
        else {
            res.status(404).json({ error: "Department not found" });
        }
    }
    catch (error) {
        console.error("Error updating department:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateDepartment = updateDepartment;
// Delete a department
const deleteDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departmentRepository = ormconfig_1.default.getRepository(Department_1.Department);
        const result = yield departmentRepository.delete(Number(req.params.id));
        if (result.affected) {
            res.json({ message: "Department deleted" });
        }
        else {
            res.status(404).json({ error: "Department not found" });
        }
    }
    catch (error) {
        console.error("Error deleting department:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteDepartment = deleteDepartment;

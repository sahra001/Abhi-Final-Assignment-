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
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getStudents = void 0;
const ormconfig_1 = __importDefault(require("../config/ormconfig")); // Correct for default export
const Student_1 = require("../entities/Student");
// Get all students
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentRepository = ormconfig_1.default.getRepository(Student_1.Student);
        const students = yield studentRepository.find();
        res.json(students);
    }
    catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getStudents = getStudents;
// Get a single student by ID
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentRepository = ormconfig_1.default.getRepository(Student_1.Student);
        const student = yield studentRepository.findOneBy({ id: Number(req.params.id) });
        if (student) {
            res.json(student);
        }
        else {
            res.status(404).json({ error: "Student not found" });
        }
    }
    catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getStudentById = getStudentById;
// Create a new student
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentRepository = ormconfig_1.default.getRepository(Student_1.Student);
        const newStudent = studentRepository.create(req.body);
        const savedStudent = yield studentRepository.save(newStudent);
        res.status(201).json(savedStudent);
    }
    catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createStudent = createStudent;
// Update a student
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentRepository = ormconfig_1.default.getRepository(Student_1.Student);
        const student = yield studentRepository.findOneBy({ id: Number(req.params.id) });
        if (student) {
            studentRepository.merge(student, req.body);
            const updatedStudent = yield studentRepository.save(student);
            res.json(updatedStudent);
        }
        else {
            res.status(404).json({ error: "Student not found" });
        }
    }
    catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateStudent = updateStudent;
// Delete a student
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentRepository = ormconfig_1.default.getRepository(Student_1.Student);
        const result = yield studentRepository.delete(Number(req.params.id));
        if (result.affected) {
            res.json({ message: "Student deleted" });
        }
        else {
            res.status(404).json({ error: "Student not found" });
        }
    }
    catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteStudent = deleteStudent;

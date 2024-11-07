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
exports.deleteUniversity = exports.updateUniversity = exports.createUniversity = exports.getUniversityById = exports.getUniversities = void 0;
const ormconfig_1 = __importDefault(require("../config/ormconfig")); // Correct for default export
const University_1 = require("../entities/University");
// Get all universities with their related departments and specializations
const getUniversities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const universityRepository = ormconfig_1.default.getRepository(University_1.University); // Use the DataSource instance
        const universities = yield universityRepository.find({
            relations: ["departments", "departments.specializations", "departments.specializations.students"],
        });
        res.json(universities);
    }
    catch (error) {
        console.error("Error fetching universities:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getUniversities = getUniversities;
// Get a single university by ID
const getUniversityById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const universityRepository = ormconfig_1.default.getRepository(University_1.University);
        const university = yield universityRepository.findOne({
            where: { id: Number(req.params.id) }, // Ensure id is a number
            relations: ["departments", "departments.specializations", "departments.specializations.students"],
        });
        if (university) {
            res.json(university);
        }
        else {
            res.status(404).json({ error: "University not found" });
        }
    }
    catch (error) {
        console.error("Error fetching university:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getUniversityById = getUniversityById;
// Create a new university
const createUniversity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const universityRepository = ormconfig_1.default.getRepository(University_1.University);
        const newUniversity = universityRepository.create(req.body);
        const savedUniversity = yield universityRepository.save(newUniversity);
        res.status(201).json(savedUniversity);
    }
    catch (error) {
        console.error("Error creating university:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createUniversity = createUniversity;
// Update a university
const updateUniversity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const universityRepository = ormconfig_1.default.getRepository(University_1.University);
        const university = yield universityRepository.findOneBy({ id: Number(req.params.id) });
        if (university) {
            universityRepository.merge(university, req.body);
            const updatedUniversity = yield universityRepository.save(university);
            res.json(updatedUniversity);
        }
        else {
            res.status(404).json({ error: "University not found" });
        }
    }
    catch (error) {
        console.error("Error updating university:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateUniversity = updateUniversity;
// Delete a university
const deleteUniversity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const universityRepository = ormconfig_1.default.getRepository(University_1.University);
        const result = yield universityRepository.delete(Number(req.params.id));
        if (result.affected) {
            res.json({ message: "University deleted" });
        }
        else {
            res.status(404).json({ error: "University not found" });
        }
    }
    catch (error) {
        console.error("Error deleting university:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteUniversity = deleteUniversity;

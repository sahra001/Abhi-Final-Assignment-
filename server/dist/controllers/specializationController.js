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
exports.deleteSpecialization = exports.updateSpecialization = exports.createSpecialization = exports.getSpecializationById = exports.getSpecializations = void 0;
const ormconfig_1 = __importDefault(require("../config/ormconfig")); // Correct for default export
const Specialization_1 = require("../entities/Specialization");
// Get all specializations
const getSpecializations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specializationRepository = ormconfig_1.default.getRepository(Specialization_1.Specialization);
        const specializations = yield specializationRepository.find({ relations: ["students"] });
        res.json(specializations);
    }
    catch (error) {
        console.error("Error fetching specializations:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getSpecializations = getSpecializations;
// Get a single specialization by ID
const getSpecializationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specializationRepository = ormconfig_1.default.getRepository(Specialization_1.Specialization);
        const specialization = yield specializationRepository.findOne({
            where: { id: Number(req.params.id) },
            relations: ["students"],
        });
        if (specialization) {
            res.json(specialization);
        }
        else {
            res.status(404).json({ error: "Specialization not found" });
        }
    }
    catch (error) {
        console.error("Error fetching specialization:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getSpecializationById = getSpecializationById;
// Create a new specialization
const createSpecialization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specializationRepository = ormconfig_1.default.getRepository(Specialization_1.Specialization);
        const newSpecialization = specializationRepository.create(req.body);
        const savedSpecialization = yield specializationRepository.save(newSpecialization);
        res.status(201).json(savedSpecialization);
    }
    catch (error) {
        console.error("Error creating specialization:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createSpecialization = createSpecialization;
// Update a specialization
const updateSpecialization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specializationRepository = ormconfig_1.default.getRepository(Specialization_1.Specialization);
        const specialization = yield specializationRepository.findOneBy({ id: Number(req.params.id) });
        if (specialization) {
            specializationRepository.merge(specialization, req.body);
            const updatedSpecialization = yield specializationRepository.save(specialization);
            res.json(updatedSpecialization);
        }
        else {
            res.status(404).json({ error: "Specialization not found" });
        }
    }
    catch (error) {
        console.error("Error updating specialization:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateSpecialization = updateSpecialization;
// Delete a specialization
const deleteSpecialization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specializationRepository = ormconfig_1.default.getRepository(Specialization_1.Specialization);
        const result = yield specializationRepository.delete(Number(req.params.id));
        if (result.affected) {
            res.json({ message: "Specialization deleted" });
        }
        else {
            res.status(404).json({ error: "Specialization not found" });
        }
    }
    catch (error) {
        console.error("Error deleting specialization:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteSpecialization = deleteSpecialization;

import { Request, Response } from "express";
import AppDataSource from "../config/ormconfig"; // Correct for default export

import { Specialization } from "../entities/Specialization";

// Get all specializations
export const getSpecializations = async (req: Request, res: Response) => {
  try {
    const specializationRepository = AppDataSource.getRepository(Specialization);
    const specializations = await specializationRepository.find({ relations: ["students"] });
    res.json(specializations);
  } catch (error) {
    console.error("Error fetching specializations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single specialization by ID
export const getSpecializationById = async (req: Request, res: Response) => {
  try {
    const specializationRepository = AppDataSource.getRepository(Specialization);
    const specialization = await specializationRepository.findOne({
      where: { id: Number(req.params.id) },
      relations: ["students"],
    });
    if (specialization) {
      res.json(specialization);
    } else {
      res.status(404).json({ error: "Specialization not found" });
    }
  } catch (error) {
    console.error("Error fetching specialization:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new specialization
export const createSpecialization = async (req: Request, res: Response) => {
  try {
    const specializationRepository = AppDataSource.getRepository(Specialization);
    const newSpecialization = specializationRepository.create(req.body);
    const savedSpecialization = await specializationRepository.save(newSpecialization);
    res.status(201).json(savedSpecialization);
  } catch (error) {
    console.error("Error creating specialization:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a specialization
export const updateSpecialization = async (req: Request, res: Response) => {
  try {
    const specializationRepository = AppDataSource.getRepository(Specialization);
    const specialization = await specializationRepository.findOneBy({ id: Number(req.params.id) });
    if (specialization) {
      specializationRepository.merge(specialization, req.body);
      const updatedSpecialization = await specializationRepository.save(specialization);
      res.json(updatedSpecialization);
    } else {
      res.status(404).json({ error: "Specialization not found" });
    }
  } catch (error) {
    console.error("Error updating specialization:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a specialization
export const deleteSpecialization = async (req: Request, res: Response) => {
  try {
    const specializationRepository = AppDataSource.getRepository(Specialization);
    const result = await specializationRepository.delete(Number(req.params.id));
    if (result.affected) {
      res.json({ message: "Specialization deleted" });
    } else {
      res.status(404).json({ error: "Specialization not found" });
    }
  } catch (error) {
    console.error("Error deleting specialization:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

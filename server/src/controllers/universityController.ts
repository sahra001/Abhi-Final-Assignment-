import { Request, Response } from "express";
import AppDataSource from "../config/ormconfig"; // Correct for default export

import { University } from "../entities/University";

// Get all universities with their related departments and specializations
export const getUniversities = async (req: Request, res: Response) => {
  try {
    const universityRepository = AppDataSource.getRepository(University); // Use the DataSource instance
    const universities = await universityRepository.find({
      relations: ["departments", "departments.specializations", "departments.specializations.students"],
    });
    res.json(universities);
  } catch (error) {
    console.error("Error fetching universities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single university by ID
export const getUniversityById = async (req: Request, res: Response) => {
  try {
    const universityRepository = AppDataSource.getRepository(University);
    const university = await universityRepository.findOne({
      where: { id: Number(req.params.id) }, // Ensure id is a number
      relations: ["departments", "departments.specializations", "departments.specializations.students"],
    });
    if (university) {
      res.json(university);
    } else {
      res.status(404).json({ error: "University not found" });
    }
  } catch (error) {
    console.error("Error fetching university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new university
export const createUniversity = async (req: Request, res: Response) => {
  try {
    const universityRepository = AppDataSource.getRepository(University);
    const newUniversity = universityRepository.create(req.body);
    const savedUniversity = await universityRepository.save(newUniversity);
    res.status(201).json(savedUniversity);
  } catch (error) {
    console.error("Error creating university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a university
export const updateUniversity = async (req: Request, res: Response) => {
  try {
    const universityRepository = AppDataSource.getRepository(University);
    const university = await universityRepository.findOneBy({ id: Number(req.params.id) });
    if (university) {
      universityRepository.merge(university, req.body);
      const updatedUniversity = await universityRepository.save(university);
      res.json(updatedUniversity);
    } else {
      res.status(404).json({ error: "University not found" });
    }
  } catch (error) {
    console.error("Error updating university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a university
export const deleteUniversity = async (req: Request, res: Response) => {
  try {
    const universityRepository = AppDataSource.getRepository(University);
    const result = await universityRepository.delete(Number(req.params.id));
    if (result.affected) {
      res.json({ message: "University deleted" });
    } else {
      res.status(404).json({ error: "University not found" });
    }
  } catch (error) {
    console.error("Error deleting university:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

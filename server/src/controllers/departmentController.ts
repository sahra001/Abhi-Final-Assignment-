import { Request, Response } from "express";

import AppDataSource from "../config/ormconfig";

import { Department } from "../entities/Department";

// Get all departments
export const getDepartments = async (req: Request, res: Response) => {
  try {
    const departmentRepository = AppDataSource.getRepository(Department);
    const departments = await departmentRepository.find({ relations: ["specializations", "specializations.students"] });
    res.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single department by ID
export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const departmentRepository = AppDataSource.getRepository(Department);
    const department = await departmentRepository.findOne({
      where: { id: Number(req.params.id) },
      relations: ["specializations", "specializations.students"],
    });
    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new department
export const createDepartment = async (req: Request, res: Response) => {
  try {
    const departmentRepository = AppDataSource.getRepository(Department);
    const newDepartment = departmentRepository.create(req.body);
    const savedDepartment = await departmentRepository.save(newDepartment);
    res.status(201).json(savedDepartment);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a department
export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const departmentRepository = AppDataSource.getRepository(Department);
    const department = await departmentRepository.findOneBy({ id: Number(req.params.id) });
    if (department) {
      departmentRepository.merge(department, req.body);
      const updatedDepartment = await departmentRepository.save(department);
      res.json(updatedDepartment);
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a department
export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const departmentRepository = AppDataSource.getRepository(Department);
    const result = await departmentRepository.delete(Number(req.params.id));
    if (result.affected) {
      res.json({ message: "Department deleted" });
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

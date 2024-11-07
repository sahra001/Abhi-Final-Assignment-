import { DataSource } from "typeorm";
import { University } from "../entities/University";
import { Department } from "../entities/Department";
import { Specialization } from "../entities/Specialization";
import { Student } from "../entities/Student";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "university_portal",
  synchronize: true,
  logging: false,
  entities: [University, Department, Specialization, Student],
  subscribers: [],
  migrations: [],
});

export default AppDataSource; // Default export

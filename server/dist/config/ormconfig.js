"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const University_1 = require("../entities/University");
const Department_1 = require("../entities/Department");
const Specialization_1 = require("../entities/Specialization");
const Student_1 = require("../entities/Student");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "university_portal",
    synchronize: true,
    logging: false,
    entities: [University_1.University, Department_1.Department, Specialization_1.Specialization, Student_1.Student],
    subscribers: [],
    migrations: [],
});
exports.default = AppDataSource; // Default export

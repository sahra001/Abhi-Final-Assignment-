"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ormconfig_1 = __importDefault(require("./config/ormconfig")); // Ensure the path is correct
const universityRoutes_1 = __importDefault(require("./routes/universityRoutes"));
const departmentRoutes_1 = __importDefault(require("./routes/departmentRoutes"));
const specializationRoutes_1 = __importDefault(require("./routes/specializationRoutes"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Initialize the database connection
ormconfig_1.default.initialize()
    .then(() => {
    console.log("Connected to the database");
    // Register routes
    app.use("/api/universities", universityRoutes_1.default);
    app.use("/api/departments", departmentRoutes_1.default);
    app.use("/api/specializations", specializationRoutes_1.default);
    app.use("/api/students", studentRoutes_1.default);
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
})
    .catch((error) => console.log("Database connection error: ", error));

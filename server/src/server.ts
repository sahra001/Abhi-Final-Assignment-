import "reflect-metadata";
import express from "express";
import cors from "cors";
import AppDataSource  from "./config/ormconfig"; // Make sure this path is correct
import universityRoutes from "./routes/universityRoutes";
import departmentRoutes from "./routes/departmentRoutes";
import specializationRoutes from "./routes/specializationRoutes";
import studentRoutes from "./routes/studentRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// Root route for a welcome message
app.get("/", (req, res) => {
  res.send("Welcome to the University Students Portal API");
});

// Initialize the database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");

    // Register API routes
    app.use("/api/universities", universityRoutes);
    app.use("/api/departments", departmentRoutes);
    app.use("/api/specializations", specializationRoutes);
    app.use("/api/students", studentRoutes);

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((error) => console.log("Database connection error: ", error));

import AppDataSource from "./config/ormconfig"; // Adjust the path as needed
import { University } from "./entities/University";
import { Department } from "./entities/Department";
import { Specialization } from "./entities/Specialization";
import { Student } from "./entities/Student";

async function seed() {
  const connection = await AppDataSource.initialize();
  console.log("Database connection established for seeding");

  const universityRepository = connection.getRepository(University);
  const departmentRepository = connection.getRepository(Department);
  const specializationRepository = connection.getRepository(Specialization);
  const studentRepository = connection.getRepository(Student);

  // Create sample universities
  const universities = [
    { name: "Superior University" },
    { name: "Punjab University" },
    { name: "University of Lahore" },
    { name: "COMSATS" },
  ];

  const savedUniversities = await universityRepository.save(universityRepository.create(universities));
  console.log("Universities seeded");

  // Create departments for each university
  const departments = [
    { name: "Department of Computer Science", university: savedUniversities[0] }, // Superior University
    { name: "Department of Mathematics", university: savedUniversities[0] },
    { name: "Department of Languages", university: savedUniversities[1] }, // Punjab University
    { name: "Department of Computer Science", university: savedUniversities[2] }, // University of Lahore
    { name: "Department of Computer Science", university: savedUniversities[3] }, // COMSATS
  ];

  const savedDepartments = await departmentRepository.save(departmentRepository.create(departments));
  console.log("Departments seeded");

  // Create specializations for each department
  const specializations = [
    { name: "Data Science", department: savedDepartments[0] }, // Department of Computer Science
    { name: "Software Engineering", department: savedDepartments[0] },
    { name: "Artificial Intelligence", department: savedDepartments[0] },
    { name: "Pure Mathematics", department: savedDepartments[1] }, // Department of Mathematics
    { name: "Applied Mathematics", department: savedDepartments[1] },
    { name: "English", department: savedDepartments[2] }, // Department of Languages
    { name: "Urdu", department: savedDepartments[2] },
    { name: "Spanish", department: savedDepartments[2] },
    { name: "Data Science", department: savedDepartments[3] }, // Another CS department
    { name: "Software Engineering", department: savedDepartments[3] },
    { name: "Data Science", department: savedDepartments[4] }, // Another CS department
    { name: "Software Engineering", department: savedDepartments[4] },
  ];

  const savedSpecializations = await specializationRepository.save(specializationRepository.create(specializations));
  console.log("Specializations seeded");

  // Create students
  const students = [
    { name: "John Doe", email: "johndoe@example.com", age: 20, specialization: savedSpecializations[0] }, // Data Science
    { name: "Jane Doe", email: "janedoe@example.com", age: 22, specialization: savedSpecializations[0] },
    { name: "Bob Smith", email: "bobsmith@example.com", age: 25, specialization: savedSpecializations[3] }, // Pure Mathematics
    { name: "Alice Johnson", email: "alicejohnson@example.com", age: 21, specialization: savedSpecializations[2] }, // English
    { name: "Mike Brown", email: "mikebrown@example.com", age: 24, specialization: savedSpecializations[4] }, // Applied Mathematics
    { name: "Emily Davis", email: "emilydavis@example.com", age: 23, specialization: savedSpecializations[5] }, // Urdu
    { name: "David Lee", email: "davidlee@example.com", age: 26, specialization: savedSpecializations[6] }, // Spanish
    { name: "Ayesha Khan", email: "ayeshakhan@example.com", age: 22, specialization: savedSpecializations[7] }, // Data Science (CS)
    { name: "Sofia Rodriguez", email: "sofiarodriguez@example.com", age: 25, specialization: savedSpecializations[8] }, // Data Science (CS)
    { name: "Ahmed Ali", email: "ahmedali@example.com", age: 24, specialization: savedSpecializations[9] }, // Software Engineering (CS)
    { name: "Fatima Hassan", email: "fatimahassan@example.com", age: 23, specialization: savedSpecializations[10] }, // Data Science (CS)
    { name: "Muhammad Khan", email: "muhammadkhan@example.com", age: 25, specialization: savedSpecializations[11] }, // Software Engineering (CS)
    { name: "Ayesha Ahmed", email: "ayeshaahmed@example.com", age: 22, specialization: savedSpecializations[11] }, // Software Engineering (CS)
  ];

  await studentRepository.save(studentRepository.create(students));
  console.log("Students seeded");

  // Close connection
  await connection.destroy();
  console.log("Database connection closed");
}

// Run the seed function
seed().catch((error) => console.error("Error seeding data: ", error));

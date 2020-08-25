const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  skillName: String,
  experienceInYears: String,
  proficiency: String,
});

const employeeSchema = new mongoose.Schema({
  name: String,
  contactPreference: String,
  email: String,
  phone: String,
  skills: [{ type: skillSchema, required: true }],
});

const Employee = mongoose.model("Employee", employeeSchema);
exports.Employee = Employee;

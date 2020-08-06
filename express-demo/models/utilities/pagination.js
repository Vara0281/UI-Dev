const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  country: { type: String, required: true, minlength: 2, maxlength: 50 },
  address: { type: String, required: true },
});

const companySchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 2, maxlength: 50 },
  email: { type: String, default: false },
  phone: { type: String, required: true, minlength: 10, maxlength: 10 },
  location: { type: locationSchema, required: true },
});

const employeeSchema = new mongoose.Schema({
  index: Number,
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  isActive: { type: Boolean, default: false },
  registered: { type: Date, required: true, default: Date.now },
  age: { type: Number, min: 0 },
  gender: String,
  eyeColor: String,
  favoriteFruit: String,
  company: { type: companySchema, required: true },
  tags: Array,
});

const Employee = mongoose.model("Employee", employeeSchema);
exports.Employee = Employee;

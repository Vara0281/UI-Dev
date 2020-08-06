const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
    lowercase: true,
  },
  phone: { type: String, minlength: 10, maxlength: 10 },
  contactPreference: { type: String },
  gender: { type: String },
  dateOfBirth: { type: Date },
  department: { type: String },
  avatar: { type: String },
  isActive: { type: Boolean, default: false },
});

const Customer = mongoose.model("Customer", customerSchema);

function validatecustomer(customer) {
  const schema = Joi.object({
    _id: Joi.objectId(),
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string(),
    email: Joi.string().email().min(5).max(50).required(),
    gender: Joi.string().valid("Male", "Female"),
    department: Joi.string(),
    contactPreference: Joi.string(),
    dateOfBirth: Joi.date(),
    isActive: Joi.boolean(),
    avatar: Joi.string(),
  });
  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validatecustomer;

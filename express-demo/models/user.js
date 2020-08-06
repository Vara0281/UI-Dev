const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: { type: Boolean, default: false },
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const payload = { _id: this._id, isAdmin: this.isAdmin };
  const secretKey = process.env.jwtPrivateKey;
  const options = { expiresIn: "1h", issuer: "SriMalyadriTravels" };

  return jwt.sign(payload, secretKey, options);
};

const User = mongoose.model("User", userSchema);

function validateuser(user) {
  const schema = {
    name: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().min(5).max(30).required(),
    password: Joi.string().min(5).max(50).required(),
    isAdmin: Joi.boolean(),
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateuser;

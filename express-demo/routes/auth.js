const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const createError = require("http-errors");
const { User } = require("../models/user");

router.post("/", async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) throw createError.NotFound("User Not registered");

    // const isValid = await bcrypt.compare(req.body.password, user.password);
    const isValid = await user.isValidPassword(req.body.password);
    if (!isValid) throw createError.Unauthorized("Invalid Email Or Password");

    const AccessToken = user.generateAccessToken();
    res.send({ AccessToken });
  } catch (error) {
    next(error);
  }
});

function validate(req) {
  const schema = {
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = router;

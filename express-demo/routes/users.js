const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const createError = require("http-errors");

router.get("/", async (req, res) => {
  // const users = await User.find().sort("name");
  const users = await User.find()
    .where("name")
    .in(["Varaprasad Yadav"])
    .select("-password -__v");
  console.log(users);
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password -__v");
  if (!user)
    return res.status(404).send("The user With The given ID Was not found");
  res.send(user);
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) throw createError(422, "Email Already Exist");

    user = new User(req.body);
    await user.save();

    const AccessToken = user.generateAccessToken();
    res.send({ _id: user._id, name: user.name, AccessToken });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!user)
      throw createError(400, "The user With The given ID Was not found");

    await user.save(); // for bycrypt password
    const { _id, email, isAdmin } = user;
    res.send({ _id, email, isAdmin });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res) => {
  const user = await Customer.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(404).send("The customer With The given ID Was not found");

  res.send(user);
});
module.exports = router;

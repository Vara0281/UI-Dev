const express = require("express");
const router = express.Router();
const { Employee } = require("../../models/utilities/employee");

router.get("/", async (req, res) => {
  const employees = await Employee.find().sort("name");
  res.send(employees);
});

router.get("/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id).select("-__v");
  if (!employee)
    return res.status(404).send("The employee With The given ID Was not found");

  res.send(employee);
});

router.post("/", async (req, res) => {
  let employee = new Employee({ ...req.body });
  employee = await employee.save();
  res.send(employee);
});

router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!employee)
      return res
        .status(404)
        .send("The employee With The given ID Was not found");

    res.send(employee);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res) => {
  const employee = await Employee.findByIdAndRemove(req.params.id);
  if (!employee)
    return res.status(404).send("The employee With The given ID Was not found");

  res.send(employee);
});

module.exports = router;

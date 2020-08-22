const fs = require("fs");
const url = require("url");
const router = require("express").Router();
const { Customer, validate } = require("../models/customer");
const upload = require("../helper_fns/imageUpload");
const createError = require("http-errors");

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id, { __v: 0 });
    if (!customer)
      throw createError(404, "The customer With The given ID Was not found");
    res.send(customer);
  } catch (error) {
    next(error);
  }
});

router.post("/", upload.single("avatar"), async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error) throw createError(422, error.details[0].message);

    const file = req.file;
    if (!file) throw createError(422, "Please Upload Image");

    const filePath = file.path.split("\\").join("/");
    const avatar = `${req.protocol}://${req.headers.host}/${filePath}`;

    let customer = new Customer({ ...req.body, avatar });
    customer = await customer.save();

    res.send(customer);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", upload.single("avatar"), async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error) throw createError(422, error.details[0].message);

    let customer = await Customer.findById(req.params.id);
    if (!customer)
      throw createError(400, "The customer With The given ID Was not found");

    let avatar = req.body.avatar;
    if (req.file) {
      // remove old file
      let imageUrl = url.parse(customer.avatar).path.slice(1);
      fs.unlink(imageUrl, (err) => {
        if (err) throw createError(400, "No Image Is There");
      });

      // assign newfile path for avatar
      const filePath = req.file.path.split("\\").join("/");
      avatar = `${req.protocol}://${req.headers.host}/${filePath}`;
    }

    customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { ...req.body, avatar },
      { new: true }
    );

    res.send(customer);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send("The customer With The given ID Was not found");

  // for file delete purpose
  let imageUrl = url.parse(customer.avatar).path.slice(1);
  fs.unlink(imageUrl, (err) => {
    if (err) throw err;
  });

  res.send(customer);
});

module.exports = router;

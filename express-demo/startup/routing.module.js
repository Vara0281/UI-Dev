const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const error = require("../middleware/error");

const home = require("../routes/utilities/home");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const genres = require("../routes/genres");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const events = require("../routes/utilities/events");
const paginate = require("../routes/utilities/pagination");
const employees = require("../routes/utilities/employee");

module.exports = function (app) {
  app.use(cors());
  app.use(morgan("dev"));
  app.set("view engine", "pug");
  app.use("/public", express.static("./public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", home);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/genres", genres);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/events", events);
  app.use("/api/paginate", paginate);
  app.use("/api/employees", employees);

  app.use((req, res, next) => {
    next(createError(404, "Route Not Found"));
  });
  app.use(error);
};

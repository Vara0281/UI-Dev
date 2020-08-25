const express = require("express");
const router = express.Router();
const { pagination } = require("../../models/utilities/pagination");
const paginate = require("../../helper_fns/paginate");

router.get("/", async (req, res, next) => {
  const employees = await pagination.find().sort("index");
  // Optional to send for Pagination
  const page = +req.query.page || 1; // default 1
  const pageSize = +req.query.pageSize || 14; // default 10
  const maxPages = +req.query.maxPages || 10; // default 10

  const tempPagination = paginate(employees.length, page, pageSize, maxPages);
  const { startIndex, endIndex, ...pager } = tempPagination;
  const data = employees.slice(startIndex, endIndex + 1);

  res.send({ pager, data });
});

router.get("/grid", async (req, res) => {
  const employees = await pagination.find().sort("index");
  res.send(employees);
});

module.exports = router;

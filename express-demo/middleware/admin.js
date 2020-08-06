const createError = require("http-errors");

module.exports = function (req, res, next) {
  if (!req.user.isAdmin) return next(createError.Forbidden());
  next();
};

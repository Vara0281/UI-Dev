module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};

// const asyncMiddleware = require("../middleware/async");
// and wrapping router async functions in this asnc middleware....
// instead of writing this middleware and importing express routes 
// ..... require('express-async-errors');  
// for handling async errors in express route handler
// its just importing in index.js no need to store in constant

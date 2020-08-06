const express = require("express");
const app = express();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

require("dotenv").config();
require("./startup/init_mongodb");
require("./startup/routing.module")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

// express-async-errors debug winston winston-mongodb

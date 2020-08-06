const mongoose = require("mongoose");
const Joi = require("joi");

// custumized Schemas of customer && movie
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 4, maxlength: 50 },
  isGold: { type: Boolean, default: false },
  phone: { type: String, required: true, minlength: 10, maxlength: 10 },
});

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
});

const rentalSchma = mongoose.Schema({
  customer: { type: customerSchema, required: true },
  movie: { type: movieSchema, required: true },
  dateOut: { type: Date, required: true, default: Date.now },
  dateReturned: { type: Date },
  renalFee: { type: Number, min: 0 },
});

const Rental = mongoose.model("Rentals", rentalSchma);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };
  return Joi.validate(rental, schema);
}

exports.Rental = Rental;
exports.validate = validateRental;

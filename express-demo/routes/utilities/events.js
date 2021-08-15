const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const express = require("express");
const router = express.Router();

const events = [
  {
    _id: "1",
    continent_id: 1,
    name: "India",
    description: "lorem ipsum",
    price: 294,
    date: "2012-04-23T18:25:43.511Z",
  },
  {
    _id: "2",
    continent_id: 1,
    name: "China",
    description: "lorem ipsum",
    price: 204,
    date: "2012-04-23T18:25:43.511Z",
  },
  {
    _id: "3",
    continent_id: 1,
    name: "Japan",
    description: "lorem ipsum",
    price: 264,
    date: "2012-04-23T18:25:43.511Z",
  },
  {
    _id: "4",
    continent_id: 2,
    name: "England",
    description: "lorem ipsum",
    price: 321,
    date: "2012-04-23T18:25:43.511Z",
  },
  {
    _id: "5",
    continent_id: 2,
    name: "Italy",
    description: "lorem ipsum",
    price: 228,
    date: "2012-04-23T18:25:43.511Z",
  },
  {
    _id: "6",
    continent_id: 3,
    name: "SouthAfrica",
    description: "lorem ipsum",
    price: 121,
    date: "2012-04-23T18:25:43.511Z",
  },
  {
    _id: "7",
    continent_id: 4,
    name: "Australia",
    description: "lorem ipsum",
    price: 202,
    date: "2012-04-23T18:25:43.511Z",
  },
  {
    _id: "8",
    continent_id: 5,
    name: "None",
    description: "lorem ipsum",
    price: 70,
    date: "2012-04-23T18:25:43.511Z",
  },
  {
    _id: "9",
    continent_id: 6,
    name: "USA",
    description: "lorem ipsum",
    price: 379,
    date: "2012-04-23T18:25:43.511Z",
  },
  {
    _id: "10",
    continent_id: 7,
    name: "Brezil",
    description: "lorem ipsum",
    price: 190,
    date: "2012-04-23T18:25:43.511Z",
  },
];

const specialEvents = [
  {
    _id: "1",
    name: "Auto Expo Special",
    description: "lorem ipsum",
    date: "2012-04-23T18:25:43.511Z",
  },
  {
    _id: "2",
    name: "Auto Expo Special",
    description: "lorem ipsum",
    date: "2012-04-23T18:25:43.511Z",
  },
  {
    _id: "3",
    name: "Auto Expo Special",
    description: "lorem ipsum",
    date: "2012-04-23T18:25:43.511Z",
  },
  {
    _id: "4",
    name: "Auto Expo Special",
    description: "lorem ipsum",
    date: "2012-04-23T18:25:43.511Z",
  },
  {
    _id: "5",
    name: "Auto Expo Special",
    description: "lorem ipsum",
    date: "2012-04-23T18:25:43.511Z",
  },
  {
    _id: "6",
    name: "Auto Expo Special",
    description: "lorem ipsum",
    date: "2012-04-23T18:25:43.511Z",
  },
];

router.get("/", (req, res) => {
  res.send(events);
});

router.get("/byid/:id", (req, res) => {
  const Event = events.find((event) => event._id == req.params.id);
  if (!Event)
    return res.status(404).send("The employee With The given ID Was not found");
  res.send(Event);
});

router.get("/special", auth, (req, res) => {
  res.send(specialEvents);
});

router.get("/admins", auth, admin, (req, res) => {
  res.send(specialEvents);
});

module.exports = router;

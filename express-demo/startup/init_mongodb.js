const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected To MongoDB...."))
  .catch((err) => console.log(err.message));

// mongoose.connection.on("connected", () => {
//   console.log("Mongoose Connected to db");
// });

// mongoose.connection.on("error", (err) => {
//   console.log(err.message);
// });

// mongoose.connection.on("disconnected", () => {
//   console.log("Mongoose Connection is disconnected");
// });

// process.on("SIGINT", async () => {
//   await mongoose.connection.close();
//   process.exit(0);
// });

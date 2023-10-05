const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
dotenv.config();

const Uri = process.env.MONGO_URI;

// Import and use the routes
const ticketRoute = require("./Routes/ticketRoute");
const busRoute = require("./Routes/busRoute");
const userRoutes = require("./Routes/userRoutes");
mongoose
  .connect(Uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/ticket", ticketRoute);
app.use("/bus", busRoute);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

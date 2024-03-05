// DEPENDENCIES
const express = require("express");
const cors = require("cors");


// CONFIGURATION
const app = express();

// import the controller in order to tell the application to use the specific resource's controller
const transactionsController = require("./controllers/transactionsController");

// MIDDLEWARE PACKAGES
app.use(cors());
// needed for POST and PUT. Will parse the string sent from the fetch
app.use(express.json());

//MIDDLEWARE FOR CONTROLLERS

app.use("/api/transactions", transactionsController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Budgeting App");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});
// EXPORT
module.exports = app;

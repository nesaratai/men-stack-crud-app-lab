const mongoose = require("mongoose");

const CarsSchema = new mongoose.Schema({
    year: Number,
    Make: String,
    Model: String,
    Trim: String,
    Price: Number,
    Tax: Number,
    TotalPrice: Number
  });

  const Cars = mongoose.model("Cars", CarsSchema);


  module.exports = Cars;

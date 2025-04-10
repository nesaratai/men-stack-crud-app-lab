const mongoose = require("mongoose");

const CarsSchema = new mongoose.Schema({
    Year: Number,
    Make: String,
    Model: String,
    Trim: String,
    Price: Number,
    Description: String
  });

  const Cars = mongoose.model("Cars", CarsSchema);


  module.exports = Cars;

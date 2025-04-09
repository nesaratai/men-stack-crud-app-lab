const dotenv = require("dotenv");
dotenv.config(); 
const express = require("express");
const mongoose = require("mongoose");


const app = express();

// Add Middleware
app.use(express.urlencoded({ extended: false }));

//connect to mongo db mongooose
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });


// Import the Cars model
const Cars = require('./models/cars.js')

app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

// GET /cars/newcar
app.get("/cars/newcar", (req, res) => {
    res.render("/cars/newcar.ejs");
  });

app.get("/cars", async (req, res) => {
    const allCars = await Cars.find();
    res.render("cars/carscoll.ejs", { cars: allCars });
  });
  
app.get("/newcar", async (req, res) => {
    const allCars = await Cars.find();
    res.render("cars/newcar.ejs", { cars: allCars });
  });


// Add a new Car
app.post("/cars", async (req, res) => {
    console.log(req.body);
    await Cars.create(req.body);
    res.redirect("/cars");
  });
  



app.listen(3000, () => {
  console.log('Listening on port 3000');
});

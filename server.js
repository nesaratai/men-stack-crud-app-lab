const dotenv = require("dotenv");
dotenv.config(); 
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const app = express();

// Add Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));


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

app.get("/cars", async (req, res) => {
    res.render("index.ejs");
  });

// GET /cars/newcar
app.get("/cars/newcar", (req, res) => {
    res.render("/cars/newcar.ejs");
  });

app.get("/carscoll", async (req, res) => {
    const allCars = await Cars.find();
    res.render("cars/carscoll.ejs", { cars: allCars });
  });
  
app.get("/newcar", async (req, res) => {
    const allCars = await Cars.find();
    res.render("cars/newcar.ejs", { cars: allCars });
  });


// Edit car
app.get("/cars/:carId/edit", async (req, res) => {
    const foundCar = await Cars.findById(req.params.carId);
    res.render("cars/edit.ejs", {
      car: foundCar,
    });
  });

// show the each car by Id 
app.get("/cars/:carId", async (req, res) => {
    const foundCar = await Cars.findById(req.params.carId);
    res.render("cars/show.ejs", { car: foundCar });
  });

app.delete("/cars/:carId", async (req, res) => {
    await Cars.findByIdAndDelete(req.params.carId);
    res.redirect("/cars");
    });
  

app.put("/cars/:carId", async (req, res) => {

    // Update the Car in the database
    await Cars.findByIdAndUpdate(req.params.carId, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/cars/${req.params.carId}`);
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

const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mongodb");

const carSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    upperCase: true,
  },
  brand: {
    type: String,
    required: true,
    upperCase: true,
  },
  price: Number,
});

const carModel = mongoose.model("cars", carSchema);

app.get("/", async (_, res) => {
  const cars = await carModel.find();
  console.log(cars);
  res.send("Cars found!");
});

app.post("/post", async (req, res) => {
  const { name, brand, price } = req.body;
  const newCar = await carModel.create({ name, brand, price });
  console.log(newCar);
  res.send("Car added");
});

app.put("/update", async (req, res) => {
  const { id, name, brand, price } = req.body;
  const updateCar = await carModel.findByIdAndUpdate(
    { _id: id },
    { name, brand, price }
  );
  console.log(updateCar);
  res.send("car name updated!");
});

app.delete("/delete", async (req, res) => {
  const { id } = req.body;
  const deletedCar = await carModel.findByIdAndDelete({ _id: id });
  console.log(deletedCar);
  res.send("Car deleted");
});

app.listen(9000, console.log(9000));

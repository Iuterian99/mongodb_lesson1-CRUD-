const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mongodb");

app.listen(9000, console.log(9000));

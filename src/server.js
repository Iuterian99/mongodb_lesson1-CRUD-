const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mongodb");

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: Number,
});

const bookModel = mongoose.model("Books", bookSchema);

app.get("/", async (_, res) => {
  const foundBooks = await bookModel.find();
  console.log(foundBooks);
  res.send("Books");
});

app.post("/post", async (req, res) => {
  try {
    const { name, author, price } = req.body;
    const newBook = await bookModel.create({ name, author, price });
    console.log(newBook);

    res.send("added new Book");
  } catch (err) {
    console.log(err);
  }
});

app.listen(9000, console.log(9000));

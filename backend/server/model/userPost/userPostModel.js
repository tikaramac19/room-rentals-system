const mongoose = require("mongoose");

const Posts = new mongoose.Schema({
  image: String,
  title: String,
  location: String,
  availableRoom: Number,
  parking: Number,
  price: Number,
  hospital: String,
});

module.exports = mongoose.model("posts", Posts);

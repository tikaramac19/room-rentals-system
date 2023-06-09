const mongoose = require("mongoose");

const FlatPosts = new mongoose.Schema({
  image: { type: String },
  title: { type: String },
  location: { type: String },
  availableRoom: { type: Number },
  parking: { type: Number },
  price: { type: Number },
  hospital: { type: String },
  isFlat: { type: Boolean },
  isVisible: { type: Boolean },
  description: { type: String },
  category: { type: String },
  schools: { type: String },
  bhk: { type: String },
  isVisible: false,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  booked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    default: null,
  },
});

module.exports = mongoose.model("flats", FlatPosts);

const mongoose = require("mongoose");

const Posts = new mongoose.Schema({
  image: { type: String },
  title: { type: String },
  location: { type: String },
  availableRoom: { type: Number },
  parking: { type: Number },
  price: { type: Number },
  hospital: { type: String },
  schools: { type: String },
  isVisible: { type: Boolean },
  description: { type: String },
  category: { type: String },
  facilities: { type: String },
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

module.exports = mongoose.model("posts", Posts);

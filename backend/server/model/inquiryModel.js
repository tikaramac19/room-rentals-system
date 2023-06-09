const mongoose = require("mongoose");

const Inquiry = mongoose.Schema({
  title: { type: String },
  message: { type: String },
  email: { type: String },
  roomId: { type: String },
  ownerId: { type: String },
});

module.exports = mongoose.model("inquery", Inquiry);

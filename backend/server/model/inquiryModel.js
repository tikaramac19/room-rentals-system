const mongoose = require("mongoose");

const Inquiry = mongoose.Schema({
  title: { type: String },
  message: { type: String },
  email: { type: String },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("inquery", Inquiry);

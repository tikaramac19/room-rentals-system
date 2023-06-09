const Inquiry = require("./../model/inquiryModel");
const FlatPost = require("./../model/userPost/flatPostModel");
const RoomPost = require("./../model/userPost/userPostModel");
const Users = require("./../model/userModel");

const createRoomInquiry = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Error while creating room Inquiry" });
  }
};

const getRoomInquiry = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Error while getting room Inquiry" });
  }
};

module.exports = { createRoomInquiry, getRoomInquiry };

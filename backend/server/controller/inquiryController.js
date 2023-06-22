const Inquiry = require("./../model/inquiryModel");
const FlatPost = require("./../model/userPost/flatPostModel");
const RoomPost = require("./../model/userPost/userPostModel");
const Users = require("./../model/userModel");

const createRoomInquiry = async (req, res) => {
  try {
    const inqueryDetails = await Inquiry.create(req.body);

    res.status(200).json({
      message: "Successfully created inquiry !!",
      data: inqueryDetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Error while creating room Inquiry" });
  }
};

const getRoomInquiry = async (req, res) => {
  try {
    const inqueryList = await Inquiry.find({
      roomId: req.params.roomId,
    }).populate(["roomId", "userId"]);

    res.status(200).json({
      message: "Successfully got inquiry !!",
      data: inqueryList,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: "Error while getting room Inquiry" });
  }
};

module.exports = { createRoomInquiry, getRoomInquiry };

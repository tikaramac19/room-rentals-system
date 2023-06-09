const mongoose = require("mongoose");
const RoomPost = require("./../model/userPost/userPostModel");
const userSchema = require("./../model/userModel");
const sendMail = require("./../utils/sendMail");

function prepareEmail(details) {
  return {
    from: "Room Rental System<noreply@abcd.com>",
    to: details.email,
    subject: "Room Booked",
    text: "Room Booked",
    html: `<p>Hi <strong>${details.name}</strong><p>
        <p>your room has beed booked today.</p>
        <p><a href="" target="_blank">Help</a></p>
        `,
  };
}

//get all room ( for dashboard )
const getAllRooms = async (req, res) => {
  try {
    const rooms = await RoomPost.find({}).populate("userId").sort({ id: 1 });

    res.status(200).json({ message: "Successfully got rooms !!", data: rooms });
  } catch (error) {
    res.status.json()({
      message: "Error while fetching fooms !!",
      status: 501,
    });
  }
};
// get room by id

const getRoomById = async (req, res) => {
  try {
    const roomDetails = await RoomPost.findById(req.params.id).populate(
      "userId"
    );

    res.status(200).json({
      message: "Successfully got room details",
      status: 200,
      data: { room_details: roomDetails },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting room details !!", status: 500 });
  }
};

// delete room by id

const deleteRoomById = async (req, res) => {
  try {
    const roomDetails = await RoomPost.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Successfully deleted room !",
      status: 200,
      data: { roomDetails },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting room !!", status: 500 });
  }
};

// patch room post ( for admin dashboard purpose)

const updateRoomById = async (req, res) => {
  try {
    // if (req.params.id) return;

    const updatedData = req.body;
    const options = {
      new: true,
    };
    const roomDetails = await RoomPost.findByIdAndUpdate(
      req.params.id,
      updatedData,
      options
    )
      .populate("userId")
      .sort({ id: 1 });

    res.status(200).json({
      message: "Successfully updated room !",
      status: 200,
      data: { roomDetails },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating room !!", status: 500 });
  }
};

// Get Individual  Owners Room list

const getIndividualOwnerRoom = async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);

    if (!user) {
      res.status(500).json({ message: "User not found !!", status: 500 });
    }

    const individualOwnerRoom = await RoomPost.find({ userId: req.params.id });

    res.status(200).json({
      message: "Successfully got owner room list !!",
      status: 200,
      data: individualOwnerRoom,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error getting individual owner room list",
      status: 500,
    });
  }
};

//get all room
const getAllRoomsForUsers = async (req, res) => {
  try {
    const rooms = await RoomPost.find({ isVisible: true })
      .populate(["userId", "booked"])
      .sort({ id: 1 });

    res
      .status(200)
      .json({ message: "Successfully got rooms for user !!", data: rooms });
  } catch (error) {
    // console.log("error", error);
    res.status.json()({
      message: "Error while fetching rooms !!",
      status: 501,
    });
  }
};

// book room

const bookRoom = async (req, res) => {
  try {
    const checkRoom = await RoomPost.findById(req.params.roomId);

    if (String(req.params.userId) == checkRoom.userId) {
      res.status(403).json({ message: "You can not book your own room !!" });
    }

    if (req.decoded.role === "user") {
      const rooms = await RoomPost.findByIdAndUpdate(
        req.params.roomId,
        {
          booked: req.decoded._id,
        },
        { new: true }
      ).populate("userId");

      var mailBody = prepareEmail({
        name: rooms.userId.name,
        email: rooms.userId.email,
      });

      await sendMail.sendMail(mailBody);

      res
        .status(200)
        .json({ message: "Successfully booked rooms !!", data: rooms });
    } else {
      res.status(403).json({ message: "Unauthorized user", status: 403 });
    }
  } catch (error) {
    res.status.json()({
      message: "Error while booking room !!",
      status: 501,
    });
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
  deleteRoomById,
  updateRoomById,
  getIndividualOwnerRoom,
  getAllRoomsForUsers,
  bookRoom,
};

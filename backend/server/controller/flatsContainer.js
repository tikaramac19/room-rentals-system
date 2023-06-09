const mongoose = require("mongoose");
const FlatPosts = require("./../model/userPost/flatPostModel");
const userModel = require("../model/userModel");
const sendMail = require("./../utils/sendMail");

function prepareEmail(details) {
  return {
    from: "Room Rental System <noreply@abcd.com>",
    to: details.email,
    subject: "Flat Booked",
    text: "Your flat has been Booked",
    html: `<p>Hi <strong>${details.name}</strong><p>
        <p> Your flat has beed booked today.</p>
        <p><a href="" target="_blank">Help</a></p>
        `,
  };
}

// get all rooms for dashboard
const getAllFlats = async (req, res) => {
  try {
    const flats = await FlatPosts.find({}).populate("userId").sort({ id: 1 });

    res.status(200).json({ message: "Successfully got flats !!", data: flats });
  } catch (error) {
    res.status.json()({
      message: "Error while fetching flats !!",
      status: 501,
    });
  }
};

// get flat by id
const getFlatById = async (req, res) => {
  try {
    const flatDetails = await FlatPosts.findById(req.params.id).populate(
      "userId"
    );

    res.status(200).json({
      message: "Successfully got flat details",
      status: 200,
      data: { room_details: flatDetails },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting room details !!", status: 500 });
  }
};

const deleteFlatById = async (req, res) => {
  try {
    const flatDetails = await FlatPosts.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Successfully deleted flat !",
      status: 200,
      data: { flatDetails },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting flat !!", status: 500 });
  }
};

// approve Flats for (dashboard purpose)

const approveFlat = async (req, res) => {
  try {
    const updatedData = req.body;
    const options = {
      new: true,
    };
    const flatDetails = await FlatPosts.findByIdAndUpdate(
      req.params.id,
      updatedData,
      options
    )
      .populate("userId")
      .sort({ id: 1 });

    res.status(200).json({
      message: "Successfully approved this flat !",
      status: 200,
      data: { flatDetails },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while approving  flat !!", status: 500 });
  }
};

//get all flats for user
const getAllFlatsForUsers = async (req, res) => {
  try {
    const searchValue = req.query.search || "";

    const flats = await FlatPosts.find({
      isVisible: true,
      // location: searchValue,
    })
      .populate(["userId", "booked"])
      .sort({ id: 1 });

    res
      .status(200)
      .json({ message: "Successfully got flats for user !!", data: flats });
  } catch (error) {
    // console.log("error", error);
    res.status.json()({
      message: "Error while fetching flats !!",
      status: 501,
    });
  }
};

// Get Individual  Owners flat list

const getIndividualOwnerFlat = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      res.status(500).json({ message: "User not found !!", status: 500 });
    }

    const individualOwnerFlat = await FlatPosts.find({
      userId: req.params.id,
    });

    res.status(200).json({
      message: "Successfully got owner flat list !!",
      status: 200,
      data: individualOwnerFlat,
    });
  } catch (error) {
    // console.log("indisdjas", error);
    res.status(500).json({
      message: "Error getting individual owner flat list",
      status: 500,
    });
  }
};

// book room

const bookFlat = async (req, res) => {
  try {
    const checkFlat = await FlatPosts.findById(req.params.flatId);

    if (String(req.params.userId) == checkFlat.userId) {
      res.status(403).json({ message: "You can not book your own flat !!" });
    }

    if (req.decoded.role === "user") {
      const flats = await RoomPost.findByIdAndUpdate(
        req.params.flatId,
        {
          booked: req.decoded._id,
        },
        { new: true }
      ).populate("userId");

      var mailBody = prepareEmail({
        name: flats.userId.name,
        email: flats.userId.email,
      });

      await sendMail.sendMail(mailBody);

      res
        .status(200)
        .json({ message: "Successfully booked flats !!", data: flats });
    } else {
      res.status(403).json({ message: "Unauthorized user", status: 403 });
    }
  } catch (error) {
    res.status.json()({
      message: "Error while booking flat !!",
      status: 501,
    });
  }
};

module.exports = {
  getAllFlats,
  getFlatById,
  deleteFlatById,
  approveFlat,
  getAllFlatsForUsers,
  getIndividualOwnerFlat,
  bookFlat,
};

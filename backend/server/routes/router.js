const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  updateRole,
  getAllUser,
  changePassword,
} = require("../controller/userController");
const {
  SavePost,
  roomsUpload,
  SaveFlatPost,
  flatUpload,
} = require("./../controller/postController");
const {
  getAllRooms,
  getRoomById,
  deleteRoomById,
  updateRoomById,
  getIndividualOwnerRoom,
  getAllRoomsForUsers,
  bookRoom,
} = require("../controller/roomsController");
const {
  getAllFlats,
  deleteFlatById,
  getFlatById,
  approveFlat,
  getAllFlatsForUsers,
  getIndividualOwnerFlat,
  bookFlat,
} = require("../controller/flatsContainer");
const { authenticate } = require("../middleware/authenticate");
const { createRoomInquiry } = require("../controller/inquiryController");
router.get("/", (req, res, next) => {
  res.send("Home Route");
});

// API's
// registration api
router.post("/register", signUp);

// login api
router.post("/login", signIn);

// update role route
router.put("/update", updateRole);
// get users
router.get("/users", getAllUser);

// change password
router.patch("/change-password", changePassword);

// create post
router.post(
  "/room/uploads",
  authenticate,
  roomsUpload.single("image"),
  SavePost
);

//create flat post
router.post(
  "/flat/uploads",
  authenticate,
  flatUpload.single("image"),
  SaveFlatPost
);

//Get all rooms (dashboard)
router.get("/rooms", getAllRooms);

// get all rooms for user
router.get("/rooms/users", getAllRoomsForUsers);

// Get room by id
router.get("/rooms/:id", getRoomById);

//Delete room
router.delete("/rooms/:id", deleteRoomById);

// update room for dashboard
router.patch("/rooms/:id", updateRoomById);

// get individual owner room list
router.get("/rooms/:id/individual", getIndividualOwnerRoom);

// booked rooom
router.patch("/rooms/:roomId/booked", bookRoom);

//Get all flats
router.get("/flats", getAllFlats);

// get flat for user
router.get("/flats/all", getAllFlatsForUsers);

router.get("/flats/:id/individual", getIndividualOwnerFlat);
router.get("/flats/:id", getFlatById);
router.delete("/flats/:id", deleteFlatById);
router.patch("/flats/:id", approveFlat);
router.patch("/flats/:flatId/booked", bookFlat);

//for inquiry

router.post("/room/inquiry", createRoomInquiry);

module.exports = router;

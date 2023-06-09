const mongoose = require("mongoose");
const Posts = require("./../model/userPost/userPostModel");
const FlatPosts = require("./../model/userPost/flatPostModel");

const multer = require("multer");
const path = require("path");

const roomStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(
        path.resolve(__dirname),
        "./../../../frontend/src/uploads/rooms"
      )
    );
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const flatStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(
        path.resolve(__dirname),
        "./../../../frontend/src/uploads/flats"
      )
    );
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] == "image") {
    cb(null, true);
  } else {
    req.fileError = true;
    cb(null, true);
  }
};

const roomsUpload = multer({ storage: roomStorage, fileFilter: imageFilter });
const flatUpload = multer({ storage: flatStorage, fileFilter: imageFilter });

const SavePost = async (req, res) => {
  try {
    const {
      title,
      location,
      availableRoom,
      parking,
      hospital,
      price,
      schools,
      description,
      facilities,
    } = req.body;

    const { filename } = req.file;

    const postdata = await Posts.create({
      image: filename,
      title: title,
      location: location,
      availableRoom: availableRoom,
      parking: parking,
      hospital: hospital,
      price: price,
      isRoom: true,
      category: "room",
      schools: schools,
      description: description,
      facilities: facilities,
      userId: req.decoded._id,
      isVisible: false,
    });

    res
      .status(200)
      .json({ msg: "post created !!", status: 200, posts: postdata });
  } catch (err) {
    console.log("error", err);
    res
      .status(501)
      .json({ msg: "error occured while post rooms !!", status: 501 });
  }
};

const SaveFlatPost = async (req, res) => {
  try {
    const {
      title,
      location,
      availableRoom,
      parking,
      hospital,
      price,
      schools,
      description,
      bhk,
      facilities,
    } = req.body;

    const { filename } = req.file;

    const flatsData = await FlatPosts.create({
      image: filename,
      title: title,
      location: location,
      availableRoom: availableRoom,
      parking: parking,
      hospital: hospital,
      price: price,
      isFlat: true,
      userId: req.decoded._id,
      isVisible: false,
      category: "flat",
      description: description,
      bhk: bhk,
      schools: schools,
      facilities: facilities,
    });

    res
      .status(200)
      .json({ msg: "flats created !!", status: 200, posts: flatsData });
  } catch (err) {
    console.log("error", err);
    res
      .status(501)
      .json({ msg: "error occured while post flats !!", status: 501 });
  }
};

module.exports = { SavePost, SaveFlatPost, roomsUpload, flatUpload };

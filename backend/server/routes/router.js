const express = require("express");
const router = express.Router();
const { signUp, signIn, updateRole } = require("../controller/userController");
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

module.exports = router;

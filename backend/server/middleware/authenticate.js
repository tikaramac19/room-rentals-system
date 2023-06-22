const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const authenticate = async (req, res, next) => {
  let token;

  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
  }

  if (!token) {
    res.status(401).json({ message: "Provide token !" });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const id = decoded.id;
  const user = await userModel.findById(id);

  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  req.decoded = user;

  return next();
};

module.exports = { authenticate };

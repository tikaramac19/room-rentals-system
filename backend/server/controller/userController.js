const userModel = require("../model/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// generate random JwtSecret key
// require('crypto').randomBytes(35).toString("hex");
const SECRET_KEY =
  "ee56249fa00b9cce2134cc9efe495db92f44dab02dbe8db6f87e96a8934d708e450dc8";

// for registration
const signUp = async (req, res) => {
  // Existing User Check
  const { name, username, email, password, phone, address, role } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }

  try {
    // checking new user is exists or not
    const existingUser = await userModel.findOne({
      email: email,
    });

    if (existingUser) {
      res.status(400).json({ message: "User Already Exists" });
    } else {
      // hashed password
      const hashedPassword = await bcrypt.hashSync(password, 10);

      // creating new user
      const newUser = await userModel.create({
        name: name,
        email: email,
        username: username,
        password: hashedPassword,
        address: address,
        phone: phone,
        role: role,
      });

      // setting up the time limit of the jwt token
      const maxAge = 3 * 60 * 60;

      // Token Generate
      const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        SECRET_KEY,
        {
          expiresIn: maxAge,
        }
      );

      // sending response cookies
      // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      // sending response to the user
      res.status(201).json({
        message: "User successfully Created ",
        user: newUser,
        token: token,
      });
    }
  } catch (error) {
    res.status(500).send({ message: "something went wrong !!" });
  }
};

//  for login
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // checking  user is exists or not

    const existingUser = await userModel.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // match password

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // setting up the time limit of the jwt token
    const maxAge = 3 * 60 * 60;

    // Token Generate
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY,
      {
        expiresIn: maxAge, // 3 hours in s
      }
    );

    // cookie generate
    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   maxAge: maxAge * 1000, // 3 hours in ms
    // });

    // console.log(token)
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const updateRole = async (req, res) => {};

module.exports = { signUp, signIn, updateRole };

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookie = require("cookie-parser");
// import router
const routePath = require("./server/routes/router");
// setting dotenv config
dotenv.config();
const PORT = process.env.PORT || 8080;

mongoose.set("strictQuery", false);

// import database connection
const connectDB = require("./server/database/dbConnection");
const { server } = require("http");
// call connection db
connectDB();

// parse request to body-parser
// app.use(bodyParser.urlencoded({ extended: true }));

// use cors
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());
app.use(cookie());
// load router
app.use("/", routePath);

app.listen(PORT, () => {
  console.log(`server running on : http://localhost:${PORT}`);
});

// Handling Errors

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred : ${err.message}`);
  server.close(() => process.exit(1));
});

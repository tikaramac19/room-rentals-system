const nodeMailer = require("nodemailer");

module.exports = nodeMailer.createTransport({
  service: "Gmail",
  auth: {
    user: "tikaram19ac@gmail.com",
    pass: "axtrmemyuddnshhq",
  },
});

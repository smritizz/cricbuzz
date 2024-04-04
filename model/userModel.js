const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "please enter a username"],
  },
  email: {
    type: String,
    required: [true, "please enter an email"],
    // unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valud email"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"]
  }
//   passwordConfirm: {
//     type: String,
//     required: [true, "Please confirm your password"],
//     validate: {
//       // this works on save only
//       validator: function (el) {
//         return el === this.password;
//       },
//       message: "Pass are not same",
//     },
//   },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const user = mongoose.model("User", userSchema);
module.exports = user;

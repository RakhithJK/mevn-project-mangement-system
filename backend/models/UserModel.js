const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: [true, "Username is already taken."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email is already exists. Please login to your account."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    working: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)

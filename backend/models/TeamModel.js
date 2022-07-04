const mongoose = require("mongoose")

const TeamSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "User id is required."],
    },
    projectId: {
      type: mongoose.Types.ObjectId,
      required: [true, "Project id is required."],
    },
    accepted: {
      type: Number,
      default: 1, // 0 to disable auto join
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Team", TeamSchema)

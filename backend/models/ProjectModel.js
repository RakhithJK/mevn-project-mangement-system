const mongoose = require("mongoose")

const ProjectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String,
      required: false,
    },
    deadline: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "Project Id is required."],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Project", ProjectSchema)

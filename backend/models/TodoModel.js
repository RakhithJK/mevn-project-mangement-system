const mongoose = require("mongoose")

const TodoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String,
      required: false,
    },
    attachments: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      default: "todo",
    },
    projectId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Todo", TodoSchema)

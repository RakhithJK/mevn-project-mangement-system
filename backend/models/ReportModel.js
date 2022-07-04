const mongoose = require("mongoose")

const ReportSchema = mongoose.Schema(
  {
    workedTime: {
      type: Number,
      required: true,
    },
    startingTime: {
      type: Number,
      required: true,
    },
    endingTime: {
      type: Number,
      required: true,
    },
    projectId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Report", ReportSchema)

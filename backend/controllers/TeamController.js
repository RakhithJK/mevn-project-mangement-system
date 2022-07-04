// Importing database schema
const mongoose = require("mongoose")
const TeamModel = require("../models/TeamModel")
const UserModel = require("../models/UserModel")

/*
 * @desc    Create a new team member
 * @route   POST /add
 */
const addTeamMember = async (req, res) => {
  // Destructuring values
  const { email, projectId, token } = req.body
  // Validating fields
  if (email == null) {
    return res.status(400).json({ error: "Email is missing." })
  }
  if (projectId == null) {
    return res.status(400).json({ error: "Project id is missing." })
  }
  if (token == null) {
    return res.status(400).json({ error: "Token is missing." })
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "Invalid project id provided." })
  }

  try {
    // Checking if the current user has the access of the project
    const validateCurrentUser = await UserModel.findOne({ password: token })
    if (!validateCurrentUser) {
      return res.status(400).json({ error: "Something wrong went." })
    }
    const validateCurrentUserAccess = await TeamModel.findOne({
      userId: validateCurrentUser._id,
      projectId: projectId,
    })
    if (!validateCurrentUserAccess) {
      return res
        .status(400)
        .json({ error: "You're not allowed to invite someone." })
    }

    // Checking the invited user
    const user = await UserModel.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ error: "User not found." })
    }
    // Checking if the team member is already added
    const checkMember = await TeamModel.findOne({
      userId: user._id,
      projectId: projectId,
    })
    if (checkMember) {
      return res.status(400).json({ error: "Team member is already added." })
    }
    const data = await TeamModel.create({
      userId: user._id,
      projectId: projectId,
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  addTeamMember,
}

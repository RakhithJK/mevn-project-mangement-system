// Importing database schema
const ProjectModel = require("../models/ProjectModel")
const UserModel = require("../models/UserModel")
const TeamModel = require("../models/TeamModel")

/*
 * @desc    Create a new project
 * @route   POST /add
 */
const createProject = async (req, res) => {
  // Destructuring values
  const { title, description, deadline, token } = req.body
  // Validating fields
  if (title == null) {
    return res.status(400).json({ error: "Title is missing." })
  }
  if (token == null) {
    return res.status(400).json({ error: "User token is missing." })
  }

  try {
    const user = await UserModel.findOne({ password: token })
    const data = await ProjectModel.create({
      title,
      description,
      deadline,
      userId: user._id,
    })

    // Adding current user to team
    await TeamModel.create({
      userId: user._id,
      projectId: data._id,
      accepted: 1,
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/*
 * @desc    Fetch all project based on user id
 * @route   GET /
 */
const fetchProjects = async (req, res) => {
  // Destructuring values
  const { authorization } = req.headers
  // Validating fields
  if (authorization == null) {
    return res.status(400).json({ error: "Authorization token is missing." })
  }

  try {
    const user = await UserModel.findOne({ password: authorization })
    const data = await ProjectModel.find()
    const response = []

    // Checking if the user has access of the project from team collection
    for (const item of data) {
      const team = await TeamModel.findOne({
        userId: user._id,
        projectId: item._id,
        accepted: 1,
      })
      if (team) {
        response.push(item)
      }
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/*
 * @desc    Fetch a specific project
 * @route   GET /
 */
const fetchProject = async (req, res) => {
  // Destructuring values
  const { authorization } = req.headers
  const { id } = req.params
  // Validating fields
  if (authorization == null) {
    return res.status(400).json({ error: "Authorization token is missing." })
  }
  if (id == null) {
    return res.status(400).json({ error: "Project id is missing." })
  }

  try {
    const user = await UserModel.findOne({ password: authorization })
    const data = await ProjectModel.findOne({ _id: id })

    // Adding team members to data, so this can be receive from frontend
    const members = []
    const teams = await TeamModel.find({
      projectId: data._id,
      accepted: 1,
    })
    for (const member of teams) {
      const user = await UserModel.findOne({
        _id: member.userId,
      })
      members.push(user)
    }

    // Checking if the user has access of the project from team collection
    const team = await TeamModel.findOne({
      userId: user._id,
      projectId: data._id,
      accepted: 1,
    })
    if (!team) {
      return res
        .status(400)
        .json({ error: "You're not allowed to access the project." })
    }
    res.status(200).json({ data, members })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  createProject,
  fetchProjects,
  fetchProject,
}

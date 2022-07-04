// Importing database schema
const mongoose = require("mongoose")
const UserModel = require("../models/UserModel")
const TeamModel = require("../models/TeamModel")
const TodoModel = require("../models/TodoModel")

/*
 * @desc    Create a new todo
 * @route   POST /add
 */
const createTodo = async (req, res) => {
  // Destructuring values
  const { title, description, attachments, projectId, token } = req.body
  // Validating fields
  if (title == null) {
    return res.status(400).json({ error: "Title is missing." })
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "Invalid project id provided." })
  }
  if (token == null) {
    return res.status(400).json({ error: "User token is missing." })
  }

  try {
    // Getting user info
    const user = await UserModel.findOne({ password: token })
    if (!user) {
      return res.status(400).json({ error: "User not found." })
    }

    // Checking if the user has access of the project
    const team = await TeamModel.findOne({
      userId: user._id,
      projectId: projectId,
    })
    if (!team) {
      return res
        .status(400)
        .json({ error: "You're not allowed to the project." })
    }

    // Adding todo to the project
    const todo = await TodoModel.create({
      title: title,
      description: description,
      attachments: attachments,
      projectId: projectId,
    })
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/*
 * @desc    Update an existing todo
 * @route   PUT /update
 */
const updateTodo = async (req, res) => {
  // Destructuring values
  const { title, description, attachments, status, todoId, projectId, token } =
    req.body
  // Validating fields
  if (title == null) {
    return res.status(400).json({ error: "Title is missing." })
  }
  if (status == null) {
    return res.status(400).json({ error: "Status is missing." })
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "Invalid project id provided." })
  }
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    return res.status(400).json({ error: "Invalid todo provided." })
  }
  if (token == null) {
    return res.status(400).json({ error: "User token is missing." })
  }

  try {
    // Getting user info
    const user = await UserModel.findOne({ password: token })
    if (!user) {
      return res.status(400).json({ error: "User not found." })
    }

    // Checking if the user has access of the project
    const team = await TeamModel.findOne({
      userId: user._id,
      projectId: projectId,
    })
    if (!team) {
      return res
        .status(400)
        .json({ error: "You're not allowed to the project." })
    }

    // Adding todo to the project
    const todo = await TodoModel.findByIdAndUpdate(todoId, {
      title: title,
      description: description,
      attachments: attachments,
      status: status,
    })
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/*
 * @desc    Update an existing todo
 * @route   PUT /update
 */
const deleteTodo = async (req, res) => {
  // Destructuring values
  const { todoId, projectId, token } = req.body
  // Validating fields
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "Invalid project id provided." })
  }
  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    return res.status(400).json({ error: "Invalid todo provided." })
  }
  if (token == null) {
    return res.status(400).json({ error: "User token is missing." })
  }

  try {
    // Getting user info
    const user = await UserModel.findOne({ password: token })
    if (!user) {
      return res.status(400).json({ error: "User not found." })
    }

    // Checking if the user has access of the project
    const team = await TeamModel.findOne({
      userId: user._id,
      projectId: projectId,
    })
    if (!team) {
      return res
        .status(400)
        .json({ error: "You're not allowed to the project." })
    }

    // Adding todo to the project
    const todo = await TodoModel.findByIdAndDelete(todoId)
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/*
 * @desc    Fetch all todos based on the project id
 * @route   GET /
 */
const fetchTodos = async (req, res) => {
  // Destructuring values
  const { authorization } = req.headers
  const { projectId } = req.params
  // Validating fields
  if (authorization == null) {
    return res.status(400).json({ error: "Authorization token is missing." })
  }

  try {
    // Getting user info
    const user = await UserModel.findOne({ password: authorization })
    if (!user) {
      return res.status(400).json({ error: "User not found." })
    }

    // Checking if the user has access of the project
    const team = await TeamModel.findOne({
      userId: user._id,
      projectId: projectId,
    })
    if (!team) {
      return res
        .status(400)
        .json({ error: "You're not allowed to the project." })
    }

    // Fetching todos
    const todos = await TodoModel.find({
      projectId: projectId,
    })

    const todo = todos.filter(function (item) {
      return item.status == "todo"
    })
    const pending = todos.filter(function (item) {
      return item.status == "pending"
    })
    const complete = todos.filter(function (item) {
      return item.status == "complete"
    })

    res.status(200).json({ todo: todo, pending: pending, complete: complete })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  createTodo,
  fetchTodos,
  updateTodo,
  deleteTodo,
}

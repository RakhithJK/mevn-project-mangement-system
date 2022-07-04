const express = require("express")
const router = express.Router()
// Controller
const {
  createTodo,
  fetchTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/TodoController")

// POST    Creating a new todo
router.post("/add", createTodo)
// PUT    Creating a new todo
router.put("/update", updateTodo)
// DELETE    Creating a new todo
router.delete("/delete", deleteTodo)
// GET    Fetching all todos based on project id
router.get("/:projectId", fetchTodos)

module.exports = router

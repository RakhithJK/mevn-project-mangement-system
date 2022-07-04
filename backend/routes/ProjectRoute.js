const express = require("express")
const router = express.Router()
// Controller
const {
  createProject,
  fetchProjects,
  fetchProject,
} = require("../controllers/ProjectController")

// POST    Creating a user
router.get("/", fetchProjects)
router.get("/:id", fetchProject)
router.post("/add", createProject)

module.exports = router

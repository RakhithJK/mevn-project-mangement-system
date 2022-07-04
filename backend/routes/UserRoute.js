const express = require("express")
const router = express.Router()
// Controller
const { createUser, loginUser } = require("../controllers/UserController")

// POST    Creating a user
router.post("/register", createUser)
// POST    Validating a user
router.post("/login", loginUser)

module.exports = router

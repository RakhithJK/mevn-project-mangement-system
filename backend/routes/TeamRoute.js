const express = require("express")
const router = express.Router()
// Controller
const { addTeamMember } = require("../controllers/TeamController")

// POST    Creating a new team member
router.post("/add", addTeamMember)

module.exports = router

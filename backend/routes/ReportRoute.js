const express = require("express")
const router = express.Router()
// Controller
const {
  addReport,
  setWorking,
  fetchReport,
} = require("../controllers/ReportController")

// POST    Creating a new report
router.post("/add", addReport)
// POST    Setting working status to user profile
router.post("/set-working", setWorking)
// GET    Setting working status to user profile
router.get("/:project/:report", fetchReport)

module.exports = router

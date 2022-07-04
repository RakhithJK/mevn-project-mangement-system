// Importing database schema
const mongoose = require("mongoose")
const UserModel = require("../models/UserModel")
const ReportModel = require("../models/ReportModel")
const ProjectModel = require("../models/ProjectModel")

/*
 * @desc    Create a new report
 * @route   POST /add
 */
const addReport = async (req, res) => {
  // Destructuring values
  const { workedTime, startingTime, endingTime, projectId, userToken } =
    req.body
  // Validating fields
  if (workedTime == null) {
    return res.status(400).json({ error: "Worked time is missing." })
  }
  if (projectId == null) {
    return res.status(400).json({ error: "Project id is missing." })
  }
  if (userToken == null) {
    return res.status(400).json({ error: "User id is missing." })
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "Invalid project id provided." })
  }

  try {
    const user = await UserModel.findOne({ password: userToken })
    if (!user) {
      return res.status(400).json({ error: "User not found." })
    }
    // Creating report
    const data = await ReportModel.create({
      workedTime: workedTime,
      startingTime: startingTime,
      endingTime: endingTime,
      projectId: projectId,
      userId: user._id,
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/*
 * @desc    Setting status of working
 * @route   POST /set-working
 */
const setWorking = async (req, res) => {
  // Destructuring values
  const { userToken, value } = req.body
  // Validating fields
  if (userToken == null) {
    return res.status(400).json({ error: "User id is missing." })
  }

  try {
    const user = await UserModel.findOne({ password: userToken })
    if (!user) {
      return res.status(400).json({ error: "User not found." })
    }
    // Updating user
    const data = await UserModel.findByIdAndUpdate(user._id, {
      working: value,
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/*
 * @desc    Setting status of working
 * @route   POST /set-working
 */
const fetchReport = async (req, res) => {
  // Destructuring values
  const { authorization } = req.headers
  const { project, report } = req.params // project == project._id, report == user._id || 'all'
  // Validating fields
  if (authorization == null) {
    return res.status(400).json({ error: "Authorization token is missing." })
  }
  if (report == null) {
    return res.status(400).json({ error: "Report id is missing." })
  }

  try {
    // Fetching project
    const projectData = await ProjectModel.findById(project)
    // Fetching user
    let user = {}
    if (report != "all") {
      user = await UserModel.findById(report)
    }

    // Validating project and user
    if (!projectData || !user) {
      return res.status(400).json({ error: "Something wrong went." })
    }

    // Calculating reports for based on day, yesterday, week, month, year
    const response = {
      project: projectData,
      user: user,
      reports: [
        {
          time: await calcTime(new Date().toDateString(), project, report),
          text: "Today",
        },
        {
          time: await calcTime(
            getLastDate("week").toDateString(),
            project,
            report
          ),
          text: "Last Week",
        },
        {
          time: await calcTime(
            getLastDate("month").toDateString(),
            project,
            report
          ),
          text: "Last Month",
        },
        {
          time: await calcTime(
            getLastDate("year").toDateString(),
            project,
            report
          ),
          text: "Last Year",
        },
      ],
    }

    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Function to calculate today working time
const calcTime = async (
  time = new Date().toDateString(),
  projectId,
  userId
) => {
  let totalTime = 0,
    reports
  let today = new Date(time).getTime()

  // Checking if userId == 'all' don't set it
  if (userId == "all") {
    reports = await ReportModel.find({
      projectId: projectId,
      startingTime: { $gte: today },
    })
  } else {
    reports = await ReportModel.find({
      projectId: projectId,
      userId: userId,
      startingTime: { $gte: today },
    })
  }

  // Looping trow to get sum of time
  for (let index = 0; index < reports.length; index++) {
    totalTime += Number(reports[index].workedTime)
  }
  return totalTime
}

// Get last week date
const getLastDate = (type = "week") => {
  const now = new Date()
  let date = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  if (type === "week") {
    date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
  }
  if (type === "month") {
    date = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
  }
  if (type === "year") {
    date = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
  }

  return date
}

module.exports = {
  addReport,
  setWorking,
  fetchReport,
}

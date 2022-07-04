require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
// Server IP
const SERVER = process.env.SERVER_IP || "127.0.0.1"
// Port
const PORT = process.env.PORT || 5000
// Importing local files
const UserRoute = require("./routes/UserRoute")
const ProjectRoute = require("./routes/ProjectRoute")
const TeamRoute = require("./routes/TeamRoute")
const ReportRoute = require("./routes/ReportRoute")
const TodoRoute = require("./routes/TodoRoute")

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", UserRoute)
app.use("/api/projects", ProjectRoute)
app.use("/api/team", TeamRoute)
app.use("/api/reports", ReportRoute)
app.use("/api/todo", TodoRoute)

// Connect to mongo db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listening
    app.listen(PORT, SERVER, () => {
      console.log(`Server is running on ${SERVER}:${PORT}`)
    })
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`)
  })

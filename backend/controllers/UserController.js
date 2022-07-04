const bcrypt = require("bcrypt")
// Importing database schema
const UserModel = require("../models/UserModel")

/*
 * @desc    Create a new user
 * @route   POST /
 */
const createUser = async (req, res) => {
  // Destructuring values
  const { firstName, lastName, username, email, password } = req.body
  // Validating fields
  if (
    firstName == null ||
    lastName == null ||
    username == null ||
    email == null ||
    password == null
  ) {
    return res.status(400).json({ error: "All fields are required." })
  }

  // Hash password
  const hash = await bcrypt.hash(password.trim(), 10)

  try {
    const data = await UserModel.create({
      firstName,
      lastName,
      username,
      email: email.trim(),
      password: hash,
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/*
 * @desc    Login user
 * @route   POST /
 */
const loginUser = async (req, res) => {
  // Destructing values
  const { email, password } = req.body
  if (email == null || password == null) {
    return res.status(400).json({ error: "All fields are required." })
  }

  try {
    const user = await UserModel.findOne({ email: email.trim() })
    // Checking if user is exists
    if (!user) {
      return res.status(400).json({ error: "Invalid user credentials." })
    }

    const checkPassword = await bcrypt.compare(password.trim(), user.password)
    // Check password
    if (!checkPassword) {
      return res.status(400).json({ error: "Invalid user credentials." })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  createUser,
  loginUser,
}

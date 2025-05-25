const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require("uuid")
const fileHelper = require("../utils/fileHelper")

const router = express.Router()
const USERS_FILE = "./server/databases/users.json"

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, type, phone, address, contactPerson, industry, companySize } = req.body

    // Validate required fields
    if (!name || !email || !password || !type) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Load existing users
    const usersData = await fileHelper.readJsonFile(USERS_FILE)

    // Check if user already exists
    const existingUser = usersData.users.find((user) => user.email === email)
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      type,
      phone,
      address,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      isActive: true,
    }

    // Add business-specific fields
    if (type === "business") {
      newUser.contactPerson = contactPerson
      newUser.industry = industry
      newUser.companySize = companySize
    }

    // Add user to database
    usersData.users.push(newUser)
    await fileHelper.writeJsonFile(USERS_FILE, usersData)

    // Remove password from response
    const { password: _, ...userResponse } = newUser

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    // Load users
    const usersData = await fileHelper.readJsonFile(USERS_FILE)

    // Find user
    const user = usersData.users.find((u) => u.email === email)
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Update last login
    user.lastLogin = new Date().toISOString()
    await fileHelper.writeJsonFile(USERS_FILE, usersData)

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, type: user.type },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" },
    )

    // Remove password from response
    const { password: _, ...userResponse } = user

    res.json({
      message: "Login successful",
      token,
      user: userResponse,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get user profile
router.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params

    const usersData = await fileHelper.readJsonFile(USERS_FILE)
    const user = usersData.users.find((u) => u.id === id)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Remove password from response
    const { password: _, ...userResponse } = user

    res.json(userResponse)
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get all users (admin only)
router.get("/", async (req, res) => {
  try {
    const usersData = await fileHelper.readJsonFile(USERS_FILE)

    // Remove passwords from response
    const users = usersData.users.map(({ password, ...user }) => user)

    res.json(users)
  } catch (error) {
    console.error("Get users error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router

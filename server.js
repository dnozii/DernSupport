const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const path = require("path")

// Import routes
const userRoutes = require("./routes/userRoutes")
const supportRoutes = require("./routes/supportRoutes")
const scheduleRoutes = require("./routes/scheduleRoutes")
const knowledgeRoutes = require("./routes/knowledgeRoutes")
const adminRoutes = require("./routes/adminRoutes")
const sparePartsRoutes = require("./routes/sparePartsRoutes")
const jobsRoutes = require("./routes/jobsRoutes")
const analyticsRoutes = require("./routes/analyticsRoutes")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan("combined"))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Serve static files
app.use(express.static(path.join(__dirname, "../")))

// API Routes
app.use("/api/users", userRoutes)
app.use("/api/support", supportRoutes)
app.use("/api/schedule", scheduleRoutes)
app.use("/api/knowledge", knowledgeRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/spare-parts", sparePartsRoutes)
app.use("/api/jobs", jobsRoutes)
app.use("/api/analytics", analyticsRoutes)

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// Serve HTML files for frontend routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"))
})

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../login.html"))
})

app.get("/support-request", (req, res) => {
  res.sendFile(path.join(__dirname, "../support-request.html"))
})

app.get("/knowledge-base", (req, res) => {
  res.sendFile(path.join(__dirname, "../knowledge-base.html"))
})

app.get("/admin-panel", (req, res) => {
  res.sendFile(path.join(__dirname, "../admin-panel.html"))
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: "Something went wrong!",
    message: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found",
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Dern-Support server running on port ${PORT}`)
  console.log(`📱 Frontend: http://localhost:${PORT}`)
  console.log(`🔧 API: http://localhost:${PORT}/api`)
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`)
})

module.exports = app

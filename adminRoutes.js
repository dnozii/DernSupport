const express = require("express")
const fileHelper = require("../utils/fileHelper")

const router = express.Router()

// Get dashboard statistics
router.get("/dashboard/stats", async (req, res) => {
  try {
    const [supportData, usersData, jobsData, analyticsData] = await Promise.all([
      fileHelper.readJsonFile("./server/databases/supportRequests.json"),
      fileHelper.readJsonFile("./server/databases/users.json"),
      fileHelper.readJsonFile("./server/databases/jobs.json"),
      fileHelper.readJsonFile("./server/databases/analytics.json"),
    ])

    const stats = {
      openTickets: supportData.supportRequests.filter((req) => req.status === "pending" || req.status === "in-progress")
        .length,
      completedJobs: supportData.supportRequests.filter((req) => req.status === "completed").length,
      totalCustomers: usersData.users.length,
      satisfactionRate: analyticsData.satisfaction?.overall || 4.8,
      activeTechnicians: jobsData.technicians?.filter((tech) => tech.status === "available").length || 0,
      revenue: analyticsData.revenue?.monthly?.slice(-1)[0]?.amount || 0,
    }

    res.json(stats)
  } catch (error) {
    console.error("Get dashboard stats error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get recent activities
router.get("/dashboard/activities", async (req, res) => {
  try {
    const [supportData, jobsData] = await Promise.all([
      fileHelper.readJsonFile("./server/databases/supportRequests.json"),
      fileHelper.readJsonFile("./server/databases/jobs.json"),
    ])

    // Get recent support requests
    const recentRequests = supportData.supportRequests
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)

    // Get recent job updates
    const recentJobs = jobsData.jobs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 10)

    res.json({
      recentRequests,
      recentJobs,
    })
  } catch (error) {
    console.error("Get dashboard activities error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get system health
router.get("/system/health", async (req, res) => {
  try {
    const health = {
      status: "healthy",
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString(),
      services: {
        database: "operational",
        api: "operational",
        scheduler: "operational",
      },
    }

    res.json(health)
  } catch (error) {
    console.error("Get system health error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router

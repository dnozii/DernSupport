const express = require("express")
const fileHelper = require("../utils/fileHelper")

const router = express.Router()
const ANALYTICS_FILE = "./server/databases/analytics.json"

// Get analytics overview
router.get("/overview", async (req, res) => {
  try {
    const { period = "30" } = req.query
    const analyticsData = await fileHelper.readJsonFile(ANALYTICS_FILE)

    // Calculate period-specific metrics
    const overview = {
      revenue: analyticsData.revenue || {},
      tickets: analyticsData.tickets || {},
      satisfaction: analyticsData.satisfaction || {},
      performance: analyticsData.performance || {},
    }

    res.json(overview)
  } catch (error) {
    console.error("Get analytics overview error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get revenue analytics
router.get("/revenue", async (req, res) => {
  try {
    const { period = "monthly" } = req.query
    const analyticsData = await fileHelper.readJsonFile(ANALYTICS_FILE)

    const revenueData = analyticsData.revenue?.[period] || []

    // Calculate growth rate
    if (revenueData.length >= 2) {
      const current = revenueData[revenueData.length - 1].amount
      const previous = revenueData[revenueData.length - 2].amount
      const growthRate = (((current - previous) / previous) * 100).toFixed(1)

      res.json({
        data: revenueData,
        growthRate: Number.parseFloat(growthRate),
        total: current,
      })
    } else {
      res.json({
        data: revenueData,
        growthRate: 0,
        total: revenueData[0]?.amount || 0,
      })
    }
  } catch (error) {
    console.error("Get revenue analytics error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get ticket analytics
router.get("/tickets", async (req, res) => {
  try {
    const analyticsData = await fileHelper.readJsonFile(ANALYTICS_FILE)

    const ticketData = {
      monthly: analyticsData.tickets?.monthly || [],
      byType: analyticsData.tickets?.byType || [],
      total: analyticsData.tickets?.monthly?.slice(-1)[0]?.count || 0,
    }

    res.json(ticketData)
  } catch (error) {
    console.error("Get ticket analytics error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get satisfaction analytics
router.get("/satisfaction", async (req, res) => {
  try {
    const analyticsData = await fileHelper.readJsonFile(ANALYTICS_FILE)

    const satisfactionData = {
      monthly: analyticsData.satisfaction?.monthly || [],
      overall: analyticsData.satisfaction?.overall || 4.8,
    }

    res.json(satisfactionData)
  } catch (error) {
    console.error("Get satisfaction analytics error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get performance metrics
router.get("/performance", async (req, res) => {
  try {
    const [jobsData, analyticsData] = await Promise.all([
      fileHelper.readJsonFile("./server/databases/jobs.json"),
      fileHelper.readJsonFile(ANALYTICS_FILE),
    ])

    // Calculate real-time performance metrics
    const technicians = jobsData.technicians || []
    const performance = {
      ...analyticsData.performance,
      technicianMetrics: technicians.map((tech) => ({
        id: tech.id,
        name: tech.name,
        completedJobs: tech.completedJobs,
        averageRating: tech.averageRating,
        averageResolutionTime: tech.averageResolutionTime,
        efficiency: Math.round((tech.completedJobs / 160) * 100), // Assuming 160 jobs per month is 100%
      })),
    }

    res.json(performance)
  } catch (error) {
    console.error("Get performance analytics error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Generate custom report
router.post("/reports", async (req, res) => {
  try {
    const { type, dateRange, filters } = req.body

    // This would generate custom reports based on the parameters
    // For now, return a simple response
    const report = {
      type,
      dateRange,
      filters,
      generatedAt: new Date().toISOString(),
      data: {
        summary: "Custom report generated successfully",
        metrics: {},
      },
    }

    res.json(report)
  } catch (error) {
    console.error("Generate report error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router

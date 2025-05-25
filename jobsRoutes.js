const express = require("express")
const { v4: uuidv4 } = require("uuid")
const fileHelper = require("../utils/fileHelper")

const router = express.Router()
const JOBS_FILE = "./server/databases/jobs.json"

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const { status, priority, technician, date } = req.query
    const jobsData = await fileHelper.readJsonFile(JOBS_FILE)

    let jobs = jobsData.jobs

    // Apply filters
    if (status) {
      jobs = jobs.filter((job) => job.status === status)
    }
    if (priority) {
      jobs = jobs.filter((job) => job.priority === priority)
    }
    if (technician) {
      jobs = jobs.filter((job) => job.assignedTechnician === technician)
    }
    if (date) {
      const filterDate = new Date(date).toISOString().split("T")[0]
      jobs = jobs.filter((job) => job.scheduledDate && job.scheduledDate.split("T")[0] === filterDate)
    }

    res.json(jobs)
  } catch (error) {
    console.error("Get jobs error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get job by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const jobsData = await fileHelper.readJsonFile(JOBS_FILE)

    const job = jobsData.jobs.find((job) => job.id === id)

    if (!job) {
      return res.status(404).json({ error: "Job not found" })
    }

    res.json(job)
  } catch (error) {
    console.error("Get job error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Create new job
router.post("/", async (req, res) => {
  try {
    const {
      requestId,
      customerId,
      title,
      description,
      type,
      priority,
      assignedTechnician,
      scheduledDate,
      estimatedDuration,
      partsRequired,
    } = req.body

    // Validate required fields
    if (!customerId || !title || !type) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const jobsData = await fileHelper.readJsonFile(JOBS_FILE)

    // Create new job
    const newJob = {
      id: `job_${uuidv4().slice(0, 8)}`,
      requestId,
      customerId,
      title,
      description,
      type,
      priority: priority || "medium",
      status: "pending",
      assignedTechnician,
      scheduledDate,
      estimatedDuration: estimatedDuration || 120,
      actualStartTime: null,
      actualEndTime: null,
      partsRequired: partsRequired || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add job to database
    jobsData.jobs.push(newJob)
    await fileHelper.writeJsonFile(JOBS_FILE, jobsData)

    res.status(201).json({
      message: "Job created successfully",
      job: newJob,
    })
  } catch (error) {
    console.error("Create job error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Update job
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const jobsData = await fileHelper.readJsonFile(JOBS_FILE)
    const jobIndex = jobsData.jobs.findIndex((job) => job.id === id)

    if (jobIndex === -1) {
      return res.status(404).json({ error: "Job not found" })
    }

    // Update job
    jobsData.jobs[jobIndex] = {
      ...jobsData.jobs[jobIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    await fileHelper.writeJsonFile(JOBS_FILE, jobsData)

    res.json({
      message: "Job updated successfully",
      job: jobsData.jobs[jobIndex],
    })
  } catch (error) {
    console.error("Update job error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get all technicians
router.get("/technicians/all", async (req, res) => {
  try {
    const jobsData = await fileHelper.readJsonFile(JOBS_FILE)
    res.json(jobsData.technicians || [])
  } catch (error) {
    console.error("Get technicians error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get technician availability
router.get("/technicians/availability", async (req, res) => {
  try {
    const { date } = req.query
    const jobsData = await fileHelper.readJsonFile(JOBS_FILE)

    const technicians = jobsData.technicians || []

    if (date) {
      // Get jobs for specific date
      const dateStr = new Date(date).toISOString().split("T")[0]
      const dayJobs = jobsData.jobs.filter((job) => job.scheduledDate && job.scheduledDate.split("T")[0] === dateStr)

      // Update technician availability based on scheduled jobs
      technicians.forEach((tech) => {
        const techJobs = dayJobs.filter((job) => job.assignedTechnician === tech.id)
        tech.scheduledJobs = techJobs.length
        tech.availableHours = 8 - techJobs.reduce((total, job) => total + job.estimatedDuration / 60, 0)
      })
    }

    res.json(technicians)
  } catch (error) {
    console.error("Get technician availability error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router

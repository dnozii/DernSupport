const express = require("express")
const { v4: uuidv4 } = require("uuid")
const fileHelper = require("../utils/fileHelper")

const router = express.Router()
const SUPPORT_REQUESTS_FILE = "./server/databases/supportRequests.json"

// Create new support request
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      type,
      title,
      description,
      deviceInfo,
      companyInfo,
      issueType,
      supportType,
      urgency,
      serviceType,
      preferredDate,
    } = req.body

    // Validate required fields
    if (!userId || !type || !title || !description) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Load existing requests
    const requestsData = await fileHelper.readJsonFile(SUPPORT_REQUESTS_FILE)

    // Create new support request
    const newRequest = {
      id: `req_${uuidv4().slice(0, 8)}`,
      userId,
      type,
      status: "pending",
      priority: urgency || "medium",
      title,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTechnician: null,
      estimatedCompletion: null,
    }

    // Add type-specific fields
    if (type === "individual") {
      newRequest.deviceInfo = deviceInfo
      newRequest.issueType = issueType
      newRequest.serviceType = serviceType
    } else if (type === "business") {
      newRequest.companyInfo = companyInfo
      newRequest.supportType = supportType
      newRequest.urgency = urgency
      newRequest.preferredDate = preferredDate
    }

    // Add request to database
    requestsData.supportRequests.push(newRequest)
    await fileHelper.writeJsonFile(SUPPORT_REQUESTS_FILE, requestsData)

    res.status(201).json({
      message: "Support request created successfully",
      request: newRequest,
    })
  } catch (error) {
    console.error("Create support request error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get all support requests
router.get("/", async (req, res) => {
  try {
    const { status, priority, type, userId } = req.query
    const requestsData = await fileHelper.readJsonFile(SUPPORT_REQUESTS_FILE)

    let requests = requestsData.supportRequests

    // Apply filters
    if (status) {
      requests = requests.filter((req) => req.status === status)
    }
    if (priority) {
      requests = requests.filter((req) => req.priority === priority)
    }
    if (type) {
      requests = requests.filter((req) => req.type === type)
    }
    if (userId) {
      requests = requests.filter((req) => req.userId === userId)
    }

    res.json(requests)
  } catch (error) {
    console.error("Get support requests error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get support request by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const requestsData = await fileHelper.readJsonFile(SUPPORT_REQUESTS_FILE)

    const request = requestsData.supportRequests.find((req) => req.id === id)

    if (!request) {
      return res.status(404).json({ error: "Support request not found" })
    }

    res.json(request)
  } catch (error) {
    console.error("Get support request error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Update support request
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const requestsData = await fileHelper.readJsonFile(SUPPORT_REQUESTS_FILE)
    const requestIndex = requestsData.supportRequests.findIndex((req) => req.id === id)

    if (requestIndex === -1) {
      return res.status(404).json({ error: "Support request not found" })
    }

    // Update request
    requestsData.supportRequests[requestIndex] = {
      ...requestsData.supportRequests[requestIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    await fileHelper.writeJsonFile(SUPPORT_REQUESTS_FILE, requestsData)

    res.json({
      message: "Support request updated successfully",
      request: requestsData.supportRequests[requestIndex],
    })
  } catch (error) {
    console.error("Update support request error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Delete support request
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const requestsData = await fileHelper.readJsonFile(SUPPORT_REQUESTS_FILE)

    const requestIndex = requestsData.supportRequests.findIndex((req) => req.id === id)

    if (requestIndex === -1) {
      return res.status(404).json({ error: "Support request not found" })
    }

    // Remove request
    requestsData.supportRequests.splice(requestIndex, 1)
    await fileHelper.writeJsonFile(SUPPORT_REQUESTS_FILE, requestsData)

    res.json({ message: "Support request deleted successfully" })
  } catch (error) {
    console.error("Delete support request error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router

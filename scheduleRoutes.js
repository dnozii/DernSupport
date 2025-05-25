const express = require("express")
const { v4: uuidv4 } = require("uuid")
const fileHelper = require("../utils/fileHelper")

const router = express.Router()
const SCHEDULE_QUOTES_FILE = "./server/databases/scheduleQuotes.json"

// Create new schedule/quote
router.post("/", async (req, res) => {
  try {
    const {
      customerId,
      serviceType,
      deviceType,
      urgency,
      basePrice,
      devicePrice,
      urgencyPrice,
      totalPrice,
      appointmentDate,
      serviceLocation,
      notes,
      customerInfo,
    } = req.body

    // Validate required fields
    if (!customerId || !serviceType || !appointmentDate) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Load existing schedules
    const schedulesData = await fileHelper.readJsonFile(SCHEDULE_QUOTES_FILE)

    // Create new schedule/quote
    const newSchedule = {
      id: `quote_${uuidv4().slice(0, 8)}`,
      customerId,
      serviceType,
      deviceType,
      urgency,
      basePrice: basePrice || 0,
      devicePrice: devicePrice || 0,
      urgencyPrice: urgencyPrice || 0,
      totalPrice: totalPrice || 0,
      appointmentDate,
      serviceLocation,
      status: "pending",
      createdAt: new Date().toISOString(),
      notes: notes || "",
      customerInfo,
    }

    // Add schedule to database
    schedulesData.scheduleQuotes.push(newSchedule)
    await fileHelper.writeJsonFile(SCHEDULE_QUOTES_FILE, schedulesData)

    res.status(201).json({
      message: "Schedule/quote created successfully",
      schedule: newSchedule,
    })
  } catch (error) {
    console.error("Create schedule error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get all schedules/quotes
router.get("/", async (req, res) => {
  try {
    const { status, customerId, date } = req.query
    const schedulesData = await fileHelper.readJsonFile(SCHEDULE_QUOTES_FILE)

    let schedules = schedulesData.scheduleQuotes

    // Apply filters
    if (status) {
      schedules = schedules.filter((schedule) => schedule.status === status)
    }
    if (customerId) {
      schedules = schedules.filter((schedule) => schedule.customerId === customerId)
    }
    if (date) {
      const filterDate = new Date(date).toISOString().split("T")[0]
      schedules = schedules.filter((schedule) => schedule.appointmentDate.split("T")[0] === filterDate)
    }

    res.json(schedules)
  } catch (error) {
    console.error("Get schedules error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get available time slots
router.get("/available-slots", async (req, res) => {
  try {
    const { date } = req.query

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" })
    }

    const schedulesData = await fileHelper.readJsonFile(SCHEDULE_QUOTES_FILE)

    // Get all appointments for the specified date
    const dateStr = new Date(date).toISOString().split("T")[0]
    const bookedSlots = schedulesData.scheduleQuotes
      .filter((schedule) => schedule.appointmentDate.split("T")[0] === dateStr && schedule.status !== "cancelled")
      .map((schedule) => schedule.appointmentDate.split("T")[1].slice(0, 5))

    // Define available time slots (9 AM to 5 PM)
    const allSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

    // Filter out booked slots
    const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot))

    res.json({
      date: dateStr,
      availableSlots,
      bookedSlots,
    })
  } catch (error) {
    console.error("Get available slots error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Update schedule/quote
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const schedulesData = await fileHelper.readJsonFile(SCHEDULE_QUOTES_FILE)
    const scheduleIndex = schedulesData.scheduleQuotes.findIndex((schedule) => schedule.id === id)

    if (scheduleIndex === -1) {
      return res.status(404).json({ error: "Schedule not found" })
    }

    // Update schedule
    schedulesData.scheduleQuotes[scheduleIndex] = {
      ...schedulesData.scheduleQuotes[scheduleIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    await fileHelper.writeJsonFile(SCHEDULE_QUOTES_FILE, schedulesData)

    res.json({
      message: "Schedule updated successfully",
      schedule: schedulesData.scheduleQuotes[scheduleIndex],
    })
  } catch (error) {
    console.error("Update schedule error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router

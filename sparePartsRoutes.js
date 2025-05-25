const express = require("express")
const { v4: uuidv4 } = require("uuid")
const fileHelper = require("../utils/fileHelper")

const router = express.Router()
const SPARE_PARTS_FILE = "./server/databases/spareParts.json"

// Get all spare parts
router.get("/", async (req, res) => {
  try {
    const { category, status, search } = req.query
    const partsData = await fileHelper.readJsonFile(SPARE_PARTS_FILE)

    let parts = partsData.spareParts

    // Apply filters
    if (category) {
      parts = parts.filter((part) => part.category === category)
    }

    if (status) {
      parts = parts.filter((part) => part.status === status)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      parts = parts.filter(
        (part) => part.name.toLowerCase().includes(searchLower) || part.id.toLowerCase().includes(searchLower),
      )
    }

    res.json(parts)
  } catch (error) {
    console.error("Get spare parts error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get part by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const partsData = await fileHelper.readJsonFile(SPARE_PARTS_FILE)

    const part = partsData.spareParts.find((part) => part.id === id)

    if (!part) {
      return res.status(404).json({ error: "Part not found" })
    }

    res.json(part)
  } catch (error) {
    console.error("Get part error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Add new part
router.post("/", async (req, res) => {
  try {
    const { id, name, category, stock, minStock, unitPrice, supplier } = req.body

    // Validate required fields
    if (!id || !name || !category || stock === undefined || !unitPrice || !supplier) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const partsData = await fileHelper.readJsonFile(SPARE_PARTS_FILE)

    // Check if part ID already exists
    const existingPart = partsData.spareParts.find((part) => part.id === id)
    if (existingPart) {
      return res.status(409).json({ error: "Part ID already exists" })
    }

    // Determine status based on stock levels
    let status = "in-stock"
    if (stock === 0) {
      status = "out-of-stock"
    } else if (stock <= minStock) {
      status = "low-stock"
    }

    // Create new part
    const newPart = {
      id,
      name,
      category,
      stock: Number.parseInt(stock),
      minStock: Number.parseInt(minStock),
      unitPrice: Number.parseFloat(unitPrice),
      supplier,
      status,
      lastOrdered: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add part to database
    partsData.spareParts.push(newPart)
    await fileHelper.writeJsonFile(SPARE_PARTS_FILE, partsData)

    res.status(201).json({
      message: "Part added successfully",
      part: newPart,
    })
  } catch (error) {
    console.error("Add part error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Update part
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const partsData = await fileHelper.readJsonFile(SPARE_PARTS_FILE)
    const partIndex = partsData.spareParts.findIndex((part) => part.id === id)

    if (partIndex === -1) {
      return res.status(404).json({ error: "Part not found" })
    }

    // Update part
    const updatedPart = {
      ...partsData.spareParts[partIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    // Update status based on stock levels
    if (updatedPart.stock === 0) {
      updatedPart.status = "out-of-stock"
    } else if (updatedPart.stock <= updatedPart.minStock) {
      updatedPart.status = "low-stock"
    } else {
      updatedPart.status = "in-stock"
    }

    partsData.spareParts[partIndex] = updatedPart
    await fileHelper.writeJsonFile(SPARE_PARTS_FILE, partsData)

    res.json({
      message: "Part updated successfully",
      part: updatedPart,
    })
  } catch (error) {
    console.error("Update part error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get inventory summary
router.get("/inventory/summary", async (req, res) => {
  try {
    const partsData = await fileHelper.readJsonFile(SPARE_PARTS_FILE)

    const summary = {
      totalParts: partsData.spareParts.length,
      inStock: partsData.spareParts.filter((part) => part.status === "in-stock").length,
      lowStock: partsData.spareParts.filter((part) => part.status === "low-stock").length,
      outOfStock: partsData.spareParts.filter((part) => part.status === "out-of-stock").length,
      totalValue: partsData.spareParts.reduce((total, part) => total + part.stock * part.unitPrice, 0),
      recentOrders: partsData.orders?.slice(-5) || [],
    }

    res.json(summary)
  } catch (error) {
    console.error("Get inventory summary error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router

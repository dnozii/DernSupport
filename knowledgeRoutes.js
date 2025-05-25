const express = require("express")
const { v4: uuidv4 } = require("uuid")
const fileHelper = require("../utils/fileHelper")

const router = express.Router()
const KNOWLEDGE_BASE_FILE = "./server/databases/knowledgeBase.json"

// Get all articles
router.get("/articles", async (req, res) => {
  try {
    const { category, search, limit } = req.query
    const knowledgeData = await fileHelper.readJsonFile(KNOWLEDGE_BASE_FILE)

    let articles = knowledgeData.articles

    // Apply filters
    if (category) {
      articles = articles.filter((article) => article.category === category)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      articles = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchLower) ||
          article.content.toLowerCase().includes(searchLower) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Sort by views (most popular first)
    articles.sort((a, b) => b.views - a.views)

    // Apply limit
    if (limit) {
      articles = articles.slice(0, Number.parseInt(limit))
    }

    res.json(articles)
  } catch (error) {
    console.error("Get articles error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get article by ID
router.get("/articles/:id", async (req, res) => {
  try {
    const { id } = req.params
    const knowledgeData = await fileHelper.readJsonFile(KNOWLEDGE_BASE_FILE)

    const article = knowledgeData.articles.find((article) => article.id === id)

    if (!article) {
      return res.status(404).json({ error: "Article not found" })
    }

    // Increment view count
    article.views += 1
    await fileHelper.writeJsonFile(KNOWLEDGE_BASE_FILE, knowledgeData)

    res.json(article)
  } catch (error) {
    console.error("Get article error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Get all categories
router.get("/categories", async (req, res) => {
  try {
    const knowledgeData = await fileHelper.readJsonFile(KNOWLEDGE_BASE_FILE)
    res.json(knowledgeData.categories)
  } catch (error) {
    console.error("Get categories error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Create new article (admin only)
router.post("/articles", async (req, res) => {
  try {
    const { title, category, content, tags, author } = req.body

    // Validate required fields
    if (!title || !category || !content) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    const knowledgeData = await fileHelper.readJsonFile(KNOWLEDGE_BASE_FILE)

    // Create new article
    const newArticle = {
      id: `kb_${uuidv4().slice(0, 8)}`,
      title,
      category,
      content,
      tags: tags || [],
      views: 0,
      rating: 0,
      readTime: Math.ceil(content.split(" ").length / 200), // Estimate reading time
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: author || "Tech Support Team",
    }

    // Add article to database
    knowledgeData.articles.push(newArticle)
    await fileHelper.writeJsonFile(KNOWLEDGE_BASE_FILE, knowledgeData)

    res.status(201).json({
      message: "Article created successfully",
      article: newArticle,
    })
  } catch (error) {
    console.error("Create article error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

// Rate article
router.post("/articles/:id/rate", async (req, res) => {
  try {
    const { id } = req.params
    const { rating } = req.body

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" })
    }

    const knowledgeData = await fileHelper.readJsonFile(KNOWLEDGE_BASE_FILE)
    const article = knowledgeData.articles.find((article) => article.id === id)

    if (!article) {
      return res.status(404).json({ error: "Article not found" })
    }

    // Simple rating calculation (in a real app, you'd store individual ratings)
    article.rating = (article.rating * article.views + rating) / (article.views + 1)

    await fileHelper.writeJsonFile(KNOWLEDGE_BASE_FILE, knowledgeData)

    res.json({
      message: "Rating submitted successfully",
      newRating: article.rating,
    })
  } catch (error) {
    console.error("Rate article error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router

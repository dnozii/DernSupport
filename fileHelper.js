const fs = require("fs").promises
const path = require("path")

class FileHelper {
  async readJsonFile(filePath) {
    try {
      const fullPath = path.resolve(filePath)
      const data = await fs.readFile(fullPath, "utf8")
      return JSON.parse(data)
    } catch (error) {
      if (error.code === "ENOENT") {
        // File doesn't exist, return empty structure
        return this.getEmptyStructure(filePath)
      }
      throw error
    }
  }

  async writeJsonFile(filePath, data) {
    try {
      const fullPath = path.resolve(filePath)
      const dir = path.dirname(fullPath)

      // Ensure directory exists
      await fs.mkdir(dir, { recursive: true })

      await fs.writeFile(fullPath, JSON.stringify(data, null, 2), "utf8")
    } catch (error) {
      throw error
    }
  }

  getEmptyStructure(filePath) {
    const filename = path.basename(filePath, ".json")

    switch (filename) {
      case "users":
        return { users: [] }
      case "supportRequests":
        return { supportRequests: [] }
      case "scheduleQuotes":
        return { scheduleQuotes: [] }
      case "knowledgeBase":
        return { articles: [], categories: [] }
      case "spareParts":
        return { spareParts: [], orders: [] }
      case "jobs":
        return { jobs: [], technicians: [] }
      case "analytics":
        return { revenue: {}, tickets: {}, satisfaction: {}, performance: {} }
      default:
        return {}
    }
  }
}

module.exports = new FileHelper()

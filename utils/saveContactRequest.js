// Utilitaire pour enregistrer les demandes de contact dans un fichier JSON
const fs = require("fs")
const path = require("path")

function saveContactRequest(email, message) {
  const filePath = path.join(__dirname, "../data/contact-requests.json")
  let requests = []
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf-8")
    try {
      requests = JSON.parse(raw)
    } catch (e) {
      requests = []
    }
  }
  requests.push({ email, message, date: new Date().toISOString() })
  fs.writeFileSync(filePath, JSON.stringify(requests, null, 2))
}

module.exports = saveContactRequest

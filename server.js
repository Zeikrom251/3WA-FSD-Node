const http = require("http")
const fs = require("fs")
const path = require("path")
const pug = require("pug")
const querystring = require("querystring")
const saveContactRequest = require("./utils/saveContactRequest")

const PORT = 3000

function getMenuItems(activePath) {
  return [
    { path: "/", title: "Home", isActive: activePath === "/" },
    { path: "/about-me", title: "About", isActive: activePath === "/about-me" },
    {
      path: "/references",
      title: "References",
      isActive: activePath === "/references",
    },
    {
      path: "/contact-me",
      title: "Contact",
      isActive: activePath === "/contact-me",
    },
  ]
}

const server = http.createServer((req, res) => {
  // Static files
  if (req.url.startsWith("/public/")) {
    const filePath = path.join(__dirname, req.url)
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404)
        res.end("Not found")
      } else {
        // Simple content-type detection
        const ext = path.extname(filePath)
        const types = {
          ".css": "text/css",
          ".js": "application/javascript",
          ".png": "image/png",
          ".jpg": "image/jpeg",
          ".ico": "image/x-icon",
        }
        res.writeHead(200, {
          "Content-Type": types[ext] || "application/octet-stream",
        })
        res.end(data)
      }
    })
    return
  }

  // GET /contact-me
  if (req.url === "/contact-me" && req.method === "GET") {
    const html = pug.renderFile(path.join(__dirname, "view", "contact.pug"), {
      menuItems: getMenuItems("/contact-me"),
    })
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(html)
    return
  }

  // POST /contact-me
  if (req.url === "/contact-me" && req.method === "POST") {
    let body = ""
    req.on("data", (chunk) => {
      body += chunk.toString()
    })
    req.on("end", () => {
      const data = querystring.parse(body)
      if (data.email && data.message) {
        saveContactRequest(data.email, data.message)
        // Afficher la home avec un toast
        const html = pug.renderFile(path.join(__dirname, "view", "index.pug"), {
          menuItems: getMenuItems("/"),
          toast: "Votre demande de contact a bien été envoyée !",
        })
        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(html)
      } else {
        res.writeHead(400, { "Content-Type": "text/plain" })
        res.end("Missing fields")
      }
    })
    return
  }

  // Home page
  if (req.url === "/" || req.url === "/index.html") {
    const html = pug.renderFile(path.join(__dirname, "view", "index.pug"), {
      menuItems: getMenuItems("/"),
      toast: null,
    })
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(html)
    return
  }

  // 404
  res.writeHead(404, { "Content-Type": "text/plain" })
  res.end("Page not found")
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

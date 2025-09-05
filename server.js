require("dotenv").config()
const express = require("express")
const path = require("path")
const {
  formatBirthdays,
  addStudent,
  deleteStudent,
  getStudents,
  editStudent,
} = require("./utils")

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use("/assets", express.static(path.join(__dirname, "assets")))

app.set("view engine", "html")
app.engine("html", require("ejs").renderFile)

app.get("/edit", (req, res) => {
  const { name } = req.query
  const students = getStudents()
  const student = students.find((s) => s.name === name)
  if (!student) return res.redirect("/users")
  res.render(path.join(__dirname, "view/edit.html"), { student })
})

app.post("/edit", (req, res) => {
  const { oldName, name, birth } = req.body
  editStudent(oldName, name, birth)
  res.redirect("/users")
})

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "view/home.html"))
})

app.get("/users", (req, res) => {
  const students = getStudents()
  res.render(path.join(__dirname, "view/users.html"), {
    students: formatBirthdays(students),
  })
})

app.post("/add", (req, res) => {
  addStudent(req.body.name, req.body.birth)
  res.redirect("/users")
})

app.post("/delete", (req, res) => {
  deleteStudent(req.body.name)
  res.redirect("/users")
})

const PORT = process.env.APP_PORT || 3000
const HOST = process.env.APP_LOCALHOST || "localhost"
app.listen(PORT, () => {
  console.log(`Server running: http://${HOST}:${PORT}`)
})

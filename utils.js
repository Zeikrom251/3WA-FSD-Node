function editStudent(oldName, newName, newBirth) {
  const students = getStudents()
  const idx = students.findIndex((s) => s.name === oldName)
  if (idx !== -1) {
    students[idx] = { name: newName, birth: newBirth }
    saveStudents(students)
  }
}
const fs = require("fs")
const path = require("path")

const DATA_PATH = path.join(__dirname, "Data", "students.json")

function getStudents() {
  if (!fs.existsSync(DATA_PATH)) {
    return []
  }
  return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"))
}

function saveStudents(students) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true })
  fs.writeFileSync(DATA_PATH, JSON.stringify(students, null, 2))
}

function addStudent(name, birth) {
  const students = getStudents()
  students.push({ name, birth })
  saveStudents(students)
}

function deleteStudent(name) {
  let students = getStudents()
  students = students.filter((s) => s.name !== name)
  saveStudents(students)
}

function formatBirthdays(students) {
  return students.map((s) => ({
    name: s.name,
    birth: s.birth,
  }))
}

module.exports = {
  getStudents,
  addStudent,
  deleteStudent,
  formatBirthdays,
  editStudent,
}

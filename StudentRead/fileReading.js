const fs = require("fs")
const path = require("path")

const filePath = path.join(__dirname, "student.txt")

// Asynchronous read
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file asynchronously:", err)
    return
  }
  console.log("Asynchronous read complete.")
})

// 1.(bis) Synchronous read for further processing
let studentsRaw
try {
  studentsRaw = fs.readFileSync(filePath, "utf8")
} catch (err) {
  console.error("Error reading file synchronously:", err)
  process.exit(1)
}

let students
try {
  students = JSON.parse(studentsRaw)
} catch (err) {
  console.error("Error parsing JSON:", err)
  process.exit(1)
}

function average(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

const studentsArray = students.map((student) => {
  const avg = average(student.notes)
  return { ...student, average: avg }
})

const above17 = studentsArray.filter((s) => s.average > 17)

const bestStudent = studentsArray.reduce((best, curr) =>
  curr.average > best.average ? curr : best
)

console.log("Students with average > 17:", above17)
console.log("Best student:", bestStudent)

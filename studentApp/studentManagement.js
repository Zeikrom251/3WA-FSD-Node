const fs = require("fs")
const path = require("path")
const readline = require("readline")

class StudentManager {
  constructor() {
    this.students = []
    this.filePath = path.join(__dirname, "../data", "student.txt")
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
  }

  loadStudents() {
    try {
      const data = fs.readFileSync(this.filePath, "utf8")
      const studentsData = JSON.parse(data)

      this.students = studentsData.map((student) => {
        const average = this.calculateAverage(student.notes)
        return { ...student, average: parseFloat(average.toFixed(2)) }
      })

      console.log("Student data loaded successfully!")
      return true
    } catch (error) {
      console.error("Error loading student data:", error.message)
      return false
    }
  }

  calculateAverage(notes) {
    if (!Array.isArray(notes) || notes.length === 0) {
      return 0
    }
    return notes.reduce((sum, note) => sum + note, 0) / notes.length
  }

  displayAllStudentNames() {
    if (this.students.length === 0) {
      console.log("No students found in the database.")
      return
    }

    console.log("\n=== ALL STUDENT NAMES ===")
    this.students.forEach((student, index) => {
      console.log(`${index + 1}. ${student.name}`)
    })
    console.log(`Total students: ${this.students.length}\n`)
  }

  searchStudentByName(searchName) {
    if (!searchName || typeof searchName !== "string") {
      console.log("Invalid name provided. Please enter a valid student name.")
      return null
    }

    const normalizedSearchName = searchName.trim().toLowerCase()
    const foundStudent = this.students.find((student) =>
      student.name.toLowerCase().includes(normalizedSearchName)
    )

    if (foundStudent) {
      console.log("\n=== STUDENT FOUND ===")
      this.displayStudentInfo(foundStudent)
      return foundStudent
    } else {
      console.log(`No student found with name containing: "${searchName}"`)
      console.log("Available students:")
      this.students.forEach((student) => console.log(`  - ${student.name}`))
      return null
    }
  }

  filterStudentsByAverage(minAverage) {
    if (isNaN(minAverage) || minAverage < 0 || minAverage > 20) {
      console.log(
        "Invalid average value. Please enter a number between 0 and 20."
      )
      return []
    }

    const filteredStudents = this.students.filter(
      (student) => student.average > minAverage
    )

    console.log(`\n=== STUDENTS WITH AVERAGE > ${minAverage} ===`)
    if (filteredStudents.length === 0) {
      console.log(
        `No students found with average grade higher than ${minAverage}.`
      )
    } else {
      filteredStudents.forEach((student) => {
        this.displayStudentInfo(student)
        console.log("---")
      })
      console.log(
        `Found ${filteredStudents.length} student(s) with average > ${minAverage}\n`
      )
    }

    return filteredStudents
  }

  displayStudentInfo(student) {
    console.log(`Name: ${student.name}`)
    console.log(`Notes: [${student.notes.join(", ")}]`)
    console.log(`Average: ${student.average}`)
    console.log(`Address: ${student.address}`)
  }

  showMenu() {
    console.log("\n=== STUDENT MANAGEMENT SYSTEM ===")
    console.log("1. Display all student names")
    console.log("2. Search for a student by name")
    console.log("3. Filter students by minimum average grade")
    console.log("4. Display all students with details")
    console.log("5. Exit")
    console.log("=====================================")
  }

  // Get user input with validation
  getUserInput(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, (answer) => {
        resolve(answer.trim())
      })
    })
  }

  displayAllStudents() {
    if (this.students.length === 0) {
      console.log("No students found in the database.")
      return
    }

    console.log("\n=== ALL STUDENTS ===")
    this.students.forEach((student, index) => {
      console.log(`\n${index + 1}. ${student.name}`)
      console.log(`   Notes: [${student.notes.join(", ")}]`)
      console.log(`   Average: ${student.average}`)
      console.log(`   Address: ${student.address}`)
    })
    console.log("\n")
  }

  // Main program loop
  async run() {
    console.log("Welcome to the Student Management System!")

    if (!this.loadStudents()) {
      console.log("Failed to load student data. Exiting...")
      this.rl.close()
      return
    }

    let running = true
    while (running) {
      this.showMenu()

      try {
        const choice = await this.getUserInput(
          "Please select an option (1-5): "
        )

        switch (choice) {
          case "1":
            this.displayAllStudentNames()
            break

          case "2":
            const searchName = await this.getUserInput(
              "Enter student name to search: "
            )
            this.searchStudentByName(searchName)
            break

          case "3":
            const minAverageInput = await this.getUserInput(
              "Enter minimum average grade: "
            )
            const minAverage = parseFloat(minAverageInput)
            this.filterStudentsByAverage(minAverage)
            break

          case "4":
            this.displayAllStudents()
            break

          case "5":
            console.log(
              "Thank you for using the Student Management System. Goodbye!"
            )
            running = false
            break

          default:
            console.log(
              "Invalid option. Please select a number between 1 and 5."
            )
        }

        if (running) {
          await this.getUserInput("\nPress Enter to continue...")
        }
      } catch (error) {
        console.error("An error occurred:", error.message)
      }
    }

    this.rl.close()
  }
}

// Main execution
if (require.main === module) {
  const manager = new StudentManager()
  manager.run().catch(console.error)
}

module.exports = StudentManager

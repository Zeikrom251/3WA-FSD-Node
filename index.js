require("dotenv").config()
const readline = require("readline")
const { playGame, showStats, resetStats } = require("./components/game")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function mainMenu() {
  rl.question(
    "\nChoose an option:\n1. Play Game\n2. Show Statistics\n3. Reset Statistics\n4. Exit\n> ",
    (answer) => {
      switch (answer.trim()) {
        case "1":
          playGame()
          mainMenu()
          break
        case "2":
          showStats()
          mainMenu()
          break
        case "3":
          resetStats()
          mainMenu()
          break
        case "4":
          rl.close()
          break
        default:
          console.log("Invalid option. Please try again.")
          mainMenu()
      }
    }
  )
}

console.log("Welcome to Rock-Paper-Scissors!")
mainMenu()

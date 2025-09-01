const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const min = 1
const max = 100
const maxAttempts = 10
const secret = Math.floor(Math.random() * (max - min + 1)) + min
let attempts = 0

console.log(
  `Welcome to the guessing game!\nGuess a number between ${min} and ${max}. You have ${maxAttempts} attempts.`
)

function ask() {
  rl.question(
    `\nAttempt ${attempts + 1}/${maxAttempts}: Enter a number: `,
    (input) => {
      const guess = Number(input.trim())
      if (!Number.isInteger(guess) || guess < min || guess > max) {
        console.log(
          `Invalid input. Please enter an integer between ${min} and ${max}.`
        )
        ask()
        return
      }
      attempts++
      if (guess === secret) {
        console.log(
          `Congratulations! You found the number ${secret} in ${attempts} attempt(s).`
        )
        rl.close()
        return
      } else if (guess < secret) {
        console.log("It's higher!")
      } else {
        console.log("It's lower!")
      }
      if (attempts >= maxAttempts) {
        console.log(
          `\nSorry, you've used all ${maxAttempts} attempts. The number was ${secret}.`
        )
        rl.close()
      } else {
        ask()
      }
    }
  )
}

ask()

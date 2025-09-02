require("dotenv").config()

const choices = [
  process.env.JKP_ROCK || "rock",
  process.env.JKP_PAPER || "paper",
  process.env.JKP_SCISSORS || "scissors",
]

function getRandomChoice() {
  return choices[Math.floor(Math.random() * choices.length)]
}

function getWinner(p1, p2) {
  if (p1 === p2) return 0
  if (
    (p1 === choices[0] && p2 === choices[2]) ||
    (p1 === choices[2] && p2 === choices[1]) ||
    (p1 === choices[1] && p2 === choices[0])
  ) {
    return 1
  }
  return 2
}

module.exports = { getRandomChoice, getWinner, choices }

const { getRandomChoice, getWinner } = require("./utils")

let stats = {
  games: 0,
  player1Wins: 0,
  player2Wins: 0,
  draws: 0,
}

function playGame() {
  const player1 = getRandomChoice()
  const player2 = getRandomChoice()
  console.log(`\nPlayer 1 chooses: ${player1}`)
  console.log(`Player 2 chooses: ${player2}`)
  const winner = getWinner(player1, player2)
  stats.games++
  if (winner === 0) {
    stats.draws++
    console.log("Result: Draw!")
  } else if (winner === 1) {
    stats.player1Wins++
    console.log("Result: Player 1 wins!")
  } else {
    stats.player2Wins++
    console.log("Result: Player 2 wins!")
  }
  console.log(
    `\nScore: Player 1: ${stats.player1Wins}, Player 2: ${stats.player2Wins}, Draws: ${stats.draws}`
  )
}

function showStats() {
  console.log(`\n--- Game Statistics ---`)
  console.log(`Games played: ${stats.games}`)
  console.log(`Player 1 wins: ${stats.player1Wins}`)
  console.log(`Player 2 wins: ${stats.player2Wins}`)
  console.log(`Draws: ${stats.draws}`)
}

function resetStats() {
  stats = { games: 0, player1Wins: 0, player2Wins: 0, draws: 0 }
  console.log("\nStatistics have been reset.")
}

module.exports = { playGame, showStats, resetStats }

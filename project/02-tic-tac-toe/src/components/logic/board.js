import { WINNER_COMBO } from "../constants"

export const checkWinnerFrom = (newBoard) => {
    for (let i = 0; i < WINNER_COMBO.length; i++) {
      const [a, b, c] = WINNER_COMBO[i]
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a]
      }
    }
    return null
  }
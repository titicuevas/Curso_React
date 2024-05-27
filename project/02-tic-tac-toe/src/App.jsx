/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './App.css'
import { useState } from 'react'
import { Square } from './components/Square'
import { TURNS,WINNER_COMBO } from './components/constants'
import confetti from 'canvas-confetti'



function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (newBoard) => {
    for (let i = 0; i < WINNER_COMBO.length; i++) {
      const [a, b, c] = WINNER_COMBO[i]
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a]
      }
    }
    return null
  }

  const updateBoard = (index) => {
    if (board[index] || winner !== null) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (newBoard.every(square => square !== null)) {
      setWinner(false)


    } else if (checkEndGame(newBoard)) {
      setWinner(false) // Esto consigue el empate
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square === null)
  }



  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>

      <button onClick={resetGame}>Reset del juego</button>

      <section className="game">
        {board.map((value, index) => (
          <Square
            key={index}
            isSelected={false}
            updateBoard={() => updateBoard(index)}
          >
            {value}
          </Square>
        ))}
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? 'Empate' : 'Gano:'}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  )
}

export default App

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './App.css'
import { useState } from 'react'

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

const WINNER_COMBO = [
  
[0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
[0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
[0, 4, 8], [2, 4, 6]             // Diagonales
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  const [winner , setWinner] = useState(null) // Null no ha ganado nadie y False ha ganado alguien

  const checkWinner = (newBoard) =>{

    // se revisa todas las combinaciones si X o O han ganado
    for (let i = 0; i < WINNER_COMBO.length; i++) {
      const [a, b, c] = WINNER_COMBO[i]
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a]
      }
    }
    //No ha ganador
    return null
  }


  const updateBoard = (index) => {
    if (board[index] || winner) return // No permitir sobrescribir un cuadrado ya marcado

    const newBoard = board.slice()
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Revisar ganador

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      alert(`El ganador es  ${newWinner}`)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>

      <section className="game">
        {board.map((_, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })}
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
    </main>
  )
}

export default App

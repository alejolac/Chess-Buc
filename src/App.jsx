import { useState } from 'react'
import './App.css'
import Board from "./components/board.jsx"
import Plays from "./logic/plays.jsx"

function App() {
  const [turn, setTurn] = useState(false) // True == Black; False == White;
  const [stateMove, setStateMove] = useState(0)
  const [board, setBoard] = useState(
    [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', 'N', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ]
  )
  const [preBoard, setPreBoard] = useState()
  const [prePiece, setPrePiece] = useState()
  const [preCoor, setPreCoor] = useState()
  const [possibilities, setPossibilities] = useState()
  const [afterPlay, setAfterPlay] = useState()

  const setStates = (board, prePiece, preCoor) => {
    setBoard(board)
    setPrePiece(prePiece)
    setPreCoor(preCoor)
  }

  const Jaque = (board, turn) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col]
        if (piece.length > 0 && piece.charCodeAt() > 90 == !turn) {
          const possibleMoves = Plays(board, piece, {"row": row, "col": col}, piece.charCodeAt() > 90)
          for (const play of possibleMoves) {
            if (play)
          }
        }
        

      }
    }
  }

  const updateBoard = (coor, content) => {
    const type = content.charCodeAt() > 90 // True == Black; False == White;
    let preType
    let newPreBoard
    if (prePiece != undefined) {
      preType = prePiece.charCodeAt() > 90
      newPreBoard = JSON.parse(JSON.stringify(preBoard));
    }
    const newBoard = JSON.parse(JSON.stringify(board));
    if (stateMove == 0 && content.length > 0) {
      newBoard[coor.row][coor.col] += ":1"
      const arrSquares = Plays(newBoard, content, coor, type)
      setPreBoard(board)
      setStateMove(1)
      setStates(newBoard, content, coor)
      if (turn == type) setPossibilities(arrSquares)
      else setPossibilities(undefined)
      return
    }
    if (stateMove == 1) {
      // selecciona la misma pieza
      if (coor.col == preCoor.col && preCoor.row == coor.row) {
        setStates(newPreBoard, content, coor)
        setStateMove(0)
        return
      }
      // Seleccionar pieza del mismo color y pasas de un color a otro
      if ((type == preType) && (content.length > 0) || (preType != turn)) {
        const arrSquares = Plays(newBoard, content, coor, type)
        newPreBoard[coor.row][coor.col] += ":1"
        setStates(newPreBoard, content, coor)
        if (turn == type) setPossibilities(arrSquares)
        else setPossibilities(undefined)
        return
      }
      // Verificar movimiento
      for (const squares of possibilities) {
        if (squares.col == coor.col && squares.row == coor.row) {
          newBoard[preCoor.row][preCoor.col] = ""
          newBoard[coor.row][coor.col] = prePiece
          setBoard(newBoard)
          setStateMove(0)
          setAfterPlay([preCoor, coor])
          setTurn(!turn)
          return
        }
      }
      // Verificar casilla vacia
      if (board[coor.row][coor.col].length == 0) {
        console.log(coor);
        setStates(newPreBoard, content, coor)
        setStateMove(0)
        return
      }
      // Handle error
      const arrSquares = Plays(newBoard, content, coor, preType)
      newPreBoard[coor.row][coor.col] += ":1"
      setStates(newPreBoard, content, coor)
      if (turn == type) setPossibilities(arrSquares)
      else setPossibilities(undefined)
      return
    }
  }

  return (
    <>
      <div className='display-game'>
        <Board afterPlay={afterPlay} stateMove={stateMove} state={board} handleClick={updateBoard} plays={possibilities} />
      </div>
    </>
  )
}

export default App

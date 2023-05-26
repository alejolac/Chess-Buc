import { useState } from 'react'
import './App.css'
import Board from "./components/board.jsx"
import Plays from "./logic/plays.jsx"

function App() {
  const [turn, setTurn] = useState(undefined) // True == Black; False == White;
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
      setPreBoard(board)
      setBoard(newBoard)
      setStateMove(1)
      setPrePiece(content)
      setPreCoor(coor)
      return
    }
    if (stateMove == 1) {
      if (coor.col == preCoor.col && preCoor.row == coor.row) {
        setStates(newPreBoard, content, coor)
        setStateMove(0)
        return
      }
      if ((type == preType) && (content.length > 0)) {
        newPreBoard[coor.row][coor.col] += ":1"
        setStates(newPreBoard, content, coor)
        return
      }
      const arrSquares = Plays(newBoard, prePiece, preCoor, preType)
      for (const squares of arrSquares) {
        if (squares.col == coor.col && squares.row == coor.row) {
          newBoard[preCoor.row][preCoor.col] = ""
          newBoard[coor.row][coor.col] = prePiece
            setBoard(newBoard)
          setStateMove(0)
        }
      }
    }
  }

  const setStates = (board, prePiece, preCoor) => {
    setBoard(board)
    setPrePiece(prePiece)
    setPreCoor(preCoor)
  }

  return (
    <>
      <div className='display-game'>
        <Board stateMove={stateMove} state={board} handleClick={updateBoard} />
      </div>
    </>
  )
}

export default App

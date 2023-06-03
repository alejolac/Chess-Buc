import { useState, useEffect } from 'react'
import './App.css'
import Board from "./components/board.jsx"
import Plays from "./logic/plays.jsx"
import Modal from "./components/modal.jsx"
import ModalPiece from "./components/modalPiece.jsx"

function App() {
  const [turn, setTurn] = useState(false) // True == Black; False == White;
  const [stateMove, setStateMove] = useState(0)
  const [board, setBoard] = useState(
    [
      ['', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['P', 'p', 'p', '', '', '', 'p', 'p'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['Q', 'Q', 'Q', '', '', '', '', ''],
      ['P', 'P', 'P', '', '', '', 'P', 'p'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', ''],
    ]
  )
  const [warning, setWarning] = useState(false)
  const [preBoard, setPreBoard] = useState()
  const [prePiece, setPrePiece] = useState()
  const [preCoor, setPreCoor] = useState()
  const [possibilities, setPossibilities] = useState()
  const [afterPlay, setAfterPlay] = useState()
  const [winner, setWinner] = useState("")
  const [fin, setFin] = useState(false)
  const [modalPawn, setModalPawn] = useState(false)

  useEffect(() => {
    if (Jaque(board, turn)) {
      if (JaqueMate(board, turn)) {
        turn == false ? setWinner("Negras") : setWinner("Blancas")
        setFin(true)
      }
    }
  }, [turn])

  function resetWinner() {
    setWinner("")
  }

  function JaqueMate(board, turn) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col]
        if (piece.length > 0 && piece.charCodeAt() > 90 == turn) {
          const possibleMoves = Plays(board, piece, { "row": row, "col": col }, piece.charCodeAt() > 90)
          for (const play of possibleMoves) {
            const newBoard = JSON.parse(JSON.stringify(board));
            newBoard[row][col] = ""
            newBoard[play.row][play.col] = piece
            if (!Jaque(newBoard, turn)) {
              return false
            }
          }
        }
      }
    }
    return true
  }

  const setStates = (board, prePiece, preCoor) => {
    setBoard(board)
    setPrePiece(prePiece)
    setPreCoor(preCoor)
  }

  function whereIsKing(board, turn) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        let piece = board[row][col]
        if (piece[0] == "K" || piece[0] == "k") {
          if (piece[0].charCodeAt() > 90 == turn) {
            return { "row": row, "col": col }
          }
        }
      }
    }
  }

  function Jaque(board, turn) {
    let king = whereIsKing(board, turn)
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col]
        if (piece.length > 0 && piece.charCodeAt() > 90 == !turn) {
          const possibleMoves = Plays(board, piece, { "row": row, "col": col }, piece.charCodeAt() > 90)
          for (const play of possibleMoves) {
            if (play.row == king.row && king.col == play.col) {
              return true
            }
          }
        }
      }
    }
    return false
  }

  function changePawn(e) {
    setModalPawn(false)
    let newBoard = JSON.parse(JSON.stringify(board));
    if (e.charCodeAt() > 90) {
      newBoard[preCoor.row + 1][preCoor.col] = e
    } else { newBoard[preCoor.row - 1][preCoor.col] = e }
    setBoard(newBoard)
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
          const boardWarning = JSON.parse(JSON.stringify(newPreBoard))
          const boardKing = JSON.parse(JSON.stringify(newBoard))
          const king = whereIsKing(boardKing, turn)
          newBoard[preCoor.row][preCoor.col] = ""
          newBoard[coor.row][coor.col] = prePiece
          if (Jaque(newBoard, turn)) {
            newPreBoard[preCoor.row][preCoor.col] += "::1"
            newPreBoard[king.row][king.col] += "::1"
            setBoard(newPreBoard)
            setWarning(true)
            setTimeout(() => {
              setBoard(boardWarning)
              setWarning(false)
            }, 1000);
            return
          }
          setBoard(newBoard)
          setStateMove(0)
          setAfterPlay([preCoor, coor])
          setTurn(!turn)
          if ((prePiece[0] == "P" && coor.row == 0) || (prePiece[0] == "p" && coor.row == 7)) setModalPawn(true)
          return
        }
      }
      // Verificar casilla vacia
      if (board[coor.row][coor.col].length == 0) {
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
        <Board winner={fin} warning={warning} afterPlay={afterPlay} stateMove={stateMove} state={board} handleClick={updateBoard} plays={possibilities} />
      </div>
      <>
        {
          winner.length > 0 &&
          <Modal onClose={resetWinner} winner={winner} />
        }
      </>
      <>
        {
          modalPawn &&
          <ModalPiece board={board} turn={turn} closeModal={changePawn} />
        }
      </>
    </>
  )
}

export default App

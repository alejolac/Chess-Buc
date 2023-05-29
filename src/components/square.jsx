import pieces from "./pieces.jsx"
import { useState, useEffect } from "react"

const Square = ({ color, colorSec, children, coor, handleClick, stateMove, plays, afterPlay }) => {
    const [draggedPiece, setDraggedPiece] = useState(null);
    const [styleSquare, setStyleSquare] = useState({ backgroundColor: color });
    const [styleSquare1, setStyleSquare1] = useState({ backgroundColor: colorSec });
    const newPieces = pieces.pieces

    const handle = () => {
        handleClick(coor, children)
    }

    const handleClass = () => {
        if (plays != undefined) {
            for (const play of plays) {
                if (afterPlay != undefined) {
                    if (play.col == coor.col && play.row == coor.row && stateMove == 1 && ((coor.col == afterPlay[0].col && coor.row == afterPlay[0].row) || (coor.col == afterPlay[1].col && coor.row == afterPlay[1].row))) {
                        if (children.length > 0) return "square square-play-length square-after " + colorSec[1]
                        return "square square-play square-after " + colorSec[1]
                    }
                }
                if (play.col == coor.col && play.row == coor.row && stateMove == 1) {
                    if (children.length > 0) return "square square-play-length"
                    return "square square-play"
                }
            }
            if (afterPlay != undefined) {
                if ((coor.col == afterPlay[0].col && coor.row == afterPlay[0].row) || (coor.col == afterPlay[1].col && coor.row == afterPlay[1].row)) {
                    return "square square-after " + colorSec[1]
                }
            }
        }
        return "square"
    }

    return (
        <div
            style={children.length != 3 ? styleSquare : styleSquare1}
            className={handleClass()}
            onClick={() => handle()}>
            <img
                src={newPieces[children[0]]} alt="" />
        </div>
    )
};

export default Square
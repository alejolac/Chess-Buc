import pieces from "./pieces.jsx"
import { useState, useEffect } from "react"

const Square = ({ color, colorSec, children, coor, handleClick, stateMove, plays, afterPlay, warning, winner }) => {
    const [draggedPiece, setDraggedPiece] = useState(null);
    const [styleSquare, setStyleSquare] = useState({ backgroundColor: color });
    const [styleSquare1, setStyleSquare1] = useState({ backgroundColor: colorSec });
    const newPieces = pieces.pieces

    const handle = () => {
        if (warning || winner) return
        handleClick(coor, children)
    }

    const handleStyles = () => {
        if (children.length == 4 || children.length == 7) return { backgroundColor: "#EC7E6A"}
        if (children.length != 3) {
            return styleSquare
        }
        return styleSquare1
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
            style={handleStyles()}
            className={handleClass()}
            onClick={() => handle()}>
            
            <img
                src={newPieces[children[0]]} alt="" />
        </div>
    )
};

export default Square
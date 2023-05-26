import pieces from "./pieces.jsx"
import { useState, useEffect } from "react"

const Square = ({ color, colorSec, children, coor, handleClick, stateMove }) => {
    const [draggedPiece, setDraggedPiece] = useState(null);
    const [styleSquare, setStyleSquare] = useState({ backgroundColor: color });
    const [styleSquare1, setStyleSquare1] = useState({ backgroundColor: colorSec });
    const newPieces = pieces.pieces

    const handle = () => {
        handleClick(coor, children)
    }
    return (
        <div
            style={children.length != 3 ? styleSquare : styleSquare1}
            className="square"
            onClick={() => handle()}>
            <img
                src={newPieces[children[0]]} alt="" />
        </div>
    )
};

export default Square
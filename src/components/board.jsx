import Square from "./square.jsx"

const Board = ({ state, handleClick, stateMove, winner, plays, afterPlay, warning }) => {
    return (
        <div className="chessboard">
            {state.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((piece, colIndex) => (
                        <Square winner={winner} warning={warning} afterPlay={afterPlay} plays={plays} stateMove={stateMove} handleClick={handleClick} coor={{ row: rowIndex, col: colIndex }} key={colIndex} color={(rowIndex + colIndex) % 2 === 0 ? '#EBECD0' : '#779556'} colorSec={(rowIndex + colIndex) % 2 === 0 ? '#F7F769' : '#BBCB2B'} >
                            {piece}
                        </ Square>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board
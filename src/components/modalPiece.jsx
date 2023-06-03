import './Modal.css';
import pieces from "./pieces.jsx"

const Modal = ({ board, turn, closeModal }) => {
    const newPieces = pieces.pieces
    const handleClick = (e) => {
        closeModal(e)
    }

    return (
        <div className="modal-overlay">
            <div className="modal modal-pawn">
                <div className='head-pawn'>
                    <div className='div-pawn'>
                        <div onClick={() => handleClick(turn ? "Q" : "q")}><img src={newPieces[turn ? "Q" : "q"]} alt="" /></div>
                        <div onClick={() => handleClick(turn ? "R" : "r")}><img src={newPieces[turn ? "R" : "r"]} alt="" /></div>
                    </div>
                    <div className='div-pawn'>
                        <div onClick={() => handleClick(turn ? "N" : "n")}><img src={newPieces[turn ? "N" : "n"]} alt="" /></div>
                        <div onClick={() => handleClick(turn ? "B" : "b")}><img src={newPieces[turn ? "B" : "b"]} alt="" /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
import './Modal.css';

const Modal = ({ winner, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>¡Partida finalizada!</h2>
                <p>{winner} gana la partida!!</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default Modal;
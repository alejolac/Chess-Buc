import { Root, Night, King, Queen, Bpawn, Wpawn, Bishop } from "./pieces.js"

const Plays = (board, piece, index, type) => {
    // OBTENER PIEZA
    if (piece !== "p" && piece !== "P") {
        piece = piece.toLowerCase();
    }
    let moveFunction;
    switch (piece) {
        case "p":
            moveFunction = (index) => Bpawn(index, board, type);
            break;
        case "P":
            moveFunction = (index) => Wpawn(index, board, type);
            break;
        case "r":
            moveFunction = (index) => Root(index, board, type);
            break;
        case "n":
            moveFunction = (index) => Night(index, board, type);
            break;
        case "b":
            moveFunction = (index) => Bishop(index, board, type);
            break;
        case "q":
            moveFunction = (index) => Queen(index, board, type);
            break;
        case "k":
            moveFunction = (index) => King(index, board, type);
            break;
        default:
            // Manejar el caso si no hay una función definida para esa pieza
            moveFunction = () => [];
            break;
    }
    return moveFunction(index);
}

export default Plays



function King(index, board, type) {
    const plays = []
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const forCol = index.col + j
            const forRow = index.row + i
            if ((forCol >= 0 && forCol < 8) && (forRow >= 0 && forRow < 8)) {
                const place = board[forRow][forCol]
                if (place.length > 0) {
                    if ((place.charCodeAt() > 90) != type) {
                        plays.push({ "row": forRow, "col": forCol })
                    }
                } else {
                    plays.push({ "row": forRow, "col": forCol })
                }
            }
        }
    }
    return plays
}

function Queen(index, board, type) {
    let arrRoot = Root(index, board, type)
    let arrBishop = Bishop(index, board, type)
    return arrRoot.concat(arrBishop)
}

function Root(index, board, type) {
    const positions = []
    let contP = 0, contN = 0, valueL = true, valueR = true, valueT = true, valueB = true
    while (valueL || valueR || valueT || valueB) {
        contP++;
        contN--;
        // Move To Bottom position
        if (index.row + contP < 8 && valueB) {
            if (board[index.row + contP][index.col].length > 0) {
                if ((board[index.row + contP][index.col].charCodeAt() > 90) != type) {
                    positions.push({ "row": index.row + contP, "col": index.col })
                }
                valueB = false
            } else {
                positions.push({ "row": index.row + contP, "col": index.col })
            }
        } else { valueB = false }

        // Move to Right position
        if (index.col + contP < 8 && valueR) {
            if (board[index.row][index.col + contP].length > 0) {
                if ((board[index.row][index.col + contP].charCodeAt() > 90) != type) {
                    positions.push({ "row": index.row, "col": index.col + contP })
                }
                valueR = false
            } else {
                positions.push({ "row": index.row, "col": index.col + contP })
            }
        } else { valueR = false }

        // Move to Left position
        if (index.col + contN >= 0 && valueL) {
            if (board[index.row][index.col + contN].length > 0) {
                if ((board[index.row][index.col + contN].charCodeAt() > 90) != type) {
                    positions.push({ "row": index.row, "col": index.col + contN })
                }
                valueL = false
            } else {
                positions.push({ "row": index.row, "col": index.col + contN })
            }
        } else { valueL = false }

        // Move to Top position
        if (index.row + contN >= 0 && valueT) {
            if (board[index.row + contN][index.col].length > 0) {
                if ((board[index.row + contN][index.col].charCodeAt() > 90) != type) {
                    positions.push({ "row": index.row + contN, "col": index.col })
                }
                valueT = false
            } else {
                positions.push({ "row": index.row + contN, "col": index.col })
            }
        } else { valueT = false }
    }
    return positions
}

function Bishop(index, board, type) {
    const positions = []
    let contP = 0, contN = 0, value1 = true, value2 = true, value3 = true, value4 = true
    while (value1 || value2 || value3 || value4) {
        contP++;
        contN--;
        // Move To Bottom position
        if (index.row + contP < 8 && index.col + contP < 8 && value1) {
            if (board[index.row + contP][index.col + contP].length > 0) {
                if ((board[index.row + contP][index.col + contP].charCodeAt() > 90) != type) {
                    positions.push({ "row": index.row + contP, "col": index.col + contP })
                }
                value1 = false
            } else {
                positions.push({ "row": index.row + contP, "col": index.col + contP })
            }
        } else { value1 = false }

        // Move to Right position
        if (index.row + contP < 8 && index.col + contN >= 0 && value2) {
            if (board[index.row + contP][index.col + contN].length > 0) {
                if ((board[index.row + contP][index.col + contN].charCodeAt() > 90) != type) {
                    positions.push({ "row": index.row + contP, "col": index.col + contN })
                }
                value2 = false
            } else {
                positions.push({ "row": index.row + contP, "col": index.col + contN })
            }
        } else { value2 = false }

        // Move to Left position
        if (index.row + contN >= 0 && index.col + contN >= 0 && value3) {
            if (board[index.row + contN][index.col + contN].length > 0) {
                if ((board[index.row + contN][index.col + contN].charCodeAt() > 90) != type) {
                    positions.push({ "row": index.row + contN, "col": index.col + contN })
                }
                value3 = false
            } else {
                positions.push({ "row": index.row + contN, "col": index.col + contN })
            }
        } else { value3 = false }

        // Move to Top position
        if (index.row + contN >= 0 && index.col + contP < 8 && value4) {
            if (board[index.row + contN][index.col + contP].length > 0) {
                if ((board[index.row + contN][index.col + contP].charCodeAt() > 90) != type) {
                    positions.push({ "row": index.row + contN, "col": index.col + contP })
                }
                value4 = false
            } else {
                positions.push({ "row": index.row + contN, "col": index.col + contP })
            }
        } else { value4 = false }
    }
    return positions
}

function Night(index, board, type) {
    const plays = []
    const moves = [
        [index.row - 2, index.col - 1],
        [index.row - 2, index.col + 1],
        [index.row - 1, index.col - 2],
        [index.row - 1, index.col + 2],
        [index.row + 1, index.col - 2],
        [index.row + 1, index.col + 2],
        [index.row + 2, index.col - 1],
        [index.row + 2, index.col + 1]
    ]
    for (const move of moves) {
        if (move[0] < 8 && move[0] >= 0 && move[1] < 8 && move[1] >= 0) {
            if (board[move[0]][move[1]].length > 0) {
                if (board[move[0]][move[1]].charCodeAt() > 90 != type) {
                    plays.push({ "row": move[0], "col": move[1] })
                }
            } else { plays.push({ "row": move[0], "col": move[1] }) }
        }
    }
    return plays
}

function Bpawn(index, board, type) {
    const plays = []
    if (index.row + 1 >= 0) {
        if (board[index.row + 1][index.col].length == 0) {
            plays.push({ "row": index.row + 1, "col": index.col })
        }
        if (index.col - 1 >= 0) {
            if (board[index.row + 1][index.col - 1].charCodeAt() > 90 != type && board[index.row + 1][index.col - 1].length > 0) {
                plays.push({ "row": index.row + 1, "col": index.col - 1 })
            }
        }
        if (index.col + 1 < 8) {
            if (board[index.row + 1][index.col + 1].charCodeAt() > 90 != type && board[index.row + 1][index.col + 1].length > 0) {
                plays.push({ "row": index.row + 1, "col": index.col + 1 })
            }
        }
    }
    if (index.row == 1 && board[index.row + 2][index.col].length == 0) {
        plays.push({ "row": index.row + 2, "col": index.col })
    }
    return plays
}

function Wpawn(index, board, type) {
    const plays = []
    if (index.row - 1 >= 0) {
        if (board[index.row - 1][index.col].length == 0) {
            plays.push({ "row": index.row - 1, "col": index.col })
        }
        if (index.col - 1 >= 0) {
            if (board[index.row - 1][index.col - 1].charCodeAt() > 90 != type && board[index.row - 1][index.col - 1].length > 0) {
                plays.push({ "row": index.row - 1, "col": index.col - 1 })
            }
        }
        if (index.col + 1 < 8) {
            if (board[index.row - 1][index.col + 1].charCodeAt() > 90 != type && board[index.row - 1][index.col + 1].length > 0) {
                plays.push({ "row": index.row - 1, "col": index.col + 1 })
            }
        }
    }
    if (index.row == 6 && board[index.row - 2][index.col].length == 0) {
        plays.push({ "row": index.row - 2, "col": index.col })
    }
    return plays
}

export { Night, Root, Queen, King, Bishop, Wpawn, Bpawn }
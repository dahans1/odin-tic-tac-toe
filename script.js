function Gameboard() {
    const ROWS = 3;
    const COLS = 3;
    const gameboard = [];

    for (let i = 0; i < ROWS; i++) {
        gameboard[i] = [];
        for (let j = 0; j < COLS; j++) {
            gameboard[i].push(Cell());
        }
    }

    const printBoard = () => {
        const board = gameboard.map((row) => row.map((cell) => cell.getValue()));
        console.log(board);
    }

    return { printBoard };
}

function Cell() {
    let value = '';

    const getValue = () => value;

    return { getValue };
}

const game = Gameboard();
game.printBoard();
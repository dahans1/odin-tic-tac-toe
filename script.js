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

    const fillCell = ([row, col], player) => {
        if (!gameboard[row][col].getValue()) {
            gameboard[row][col].setValue(player);
            return true;
        }
        return false;
    }

    const printBoard = () => {
        const board = gameboard.map((row) => row.map((cell) => cell.getValue()));
        console.log(board);
    }

    return { fillCell, printBoard };
}

function Cell() {
    let value = '';

    const getValue = () => value;

    const setValue = (player) => {
        value = player;
    }

    return { getValue, setValue };
}

function GameController(playerOne = 'X', playerTwo = 'O') {
    const board = Gameboard();
    let activePlayer = playerOne;

    const switchTurns = () => {
        activePlayer = activePlayer == playerOne ? playerTwo : playerOne;
    }

    const playRound = (row, col) => {
        console.log(`${activePlayer} is going into the cell (${row}, ${col}).`);
        if (board.fillCell([row, col], activePlayer)) {
            switchTurns();
        }
    }

    const printBoard = () => board.printBoard();

    return { playRound, printBoard };
}

const game = GameController();
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        game.playRound(i, j);
    }
}
game.printBoard();
for (let i = 0; i < 3; i++) {
    game.playRound(i, 0);
}
game.printBoard();
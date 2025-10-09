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

    const setValue = (player) => {
        value = player;
    }

    return { getValue, setValue };
}

function GameController(playerOne = 'X', playerTwo = 'O') {
    const board = Gameboard();
    const players = [playerOne, playerTwo];

    let activePlayer = playerOne;

    const switchActivePlayer = () => {
        activePlayer = activePlayer == playerOne ? playerTwo : playerOne;
    }

    const playRound = () => {
        console.log(`${activePlayer} is going into the next cell.`);
        switchActivePlayer();
    }

    return { playRound };
}

const game = GameController();
for (let i = 0; i < 7; i++) {
    game.playRound();
}
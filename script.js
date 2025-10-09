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

    const getBoard = () => gameboard;

    return { fillCell, printBoard, getBoard };
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

    const getActivePlayer = () => activePlayer;

    const printBoard = () => board.printBoard();

    return { playRound, getActivePlayer, printBoard, getBoard: board.getBoard };
}

function ScreenController() {
    const game = GameController();
    const playerTurnHeader = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const refreshScreen = () => {
        // clear content
        boardDiv.textContent = '';

        // get latest version of board and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        // display player's turn
        playerTurnHeader.textContent = `Player ${activePlayer}'s turn.`;

        // render board cells
        board.forEach((row, rIndex) => {
            row.forEach((cell, cIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');

                // set data attribute for (row, col)
                cellButton.dataset.pos = [rIndex, cIndex];

                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            });
        });
    }

    function clickCellHandler(e) {        
        if (!e.target.dataset.pos) return;
        
        const [ row, col ] = e.target.dataset.pos.split(',');
        game.playRound(row, col);
        refreshScreen();
    }
    boardDiv.addEventListener('click', clickCellHandler);

    // initial render
    refreshScreen();
} 

ScreenController();
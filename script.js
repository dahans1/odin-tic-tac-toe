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

    const checkWinner = ([row, col], player) => {
        // check main-diagonal
        let win = true;
        if (row == col) {
            for (let i = 0; i < ROWS; i++) {
                if (gameboard[i][i].getValue() !== player) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }

        // check anti-diagonal
        if (parseInt(row) + parseInt(col) === ROWS - 1) {
            win = true;
            for (let i = 0; i < ROWS; i++) {
                if (gameboard[i][ROWS - i - 1].getValue() !== player) {
                    win = false;
                    break;
                }
            }
            if (win) return true;
        }

        // check horizontal
        win = true;
        for (let c = 0; c < COLS; c++) {
            if (gameboard[row][c].getValue() !== player) {
                win = false;
                break;
            }
        }
        if (win) return true;

        // check vertical
        win = true;
        for (let r = 0; r < ROWS; r++) {
            if (gameboard[r][col].getValue() !== player) {
                win = false;
                break;
            }
        }
        if (win) return true;

        return false;
    }

    const getBoard = () => gameboard;

    return { fillCell, checkWinner, printBoard, getBoard };
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
    let gameActive = true;
    let rounds = 0;

    const switchTurns = () => {
        activePlayer = activePlayer == playerOne ? playerTwo : playerOne;
    }

    const playRound = (row, col) => {
        rounds += 1;
        if (gameActive && board.fillCell([row, col], activePlayer)) {
            if (board.checkWinner([row, col], activePlayer)) {
                gameActive = false;
            } else if (rounds == 9) {
                gameActive = false;
                activePlayer = null;
            } else {
                switchTurns();
            }
        }
    }

    const getActivePlayer = () => activePlayer;

    const printBoard = () => board.printBoard();

    const getGameStatus = () => gameActive;

    return { playRound, getActivePlayer, printBoard, getGameStatus, getBoard: board.getBoard };
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
        const gameStatus = game.getGameStatus();

        // display player's turn
        if (gameStatus) {
            playerTurnHeader.textContent = `Player ${activePlayer}'s turn.`;
        } else if (!activePlayer) {
            playerTurnHeader.textContent = `It's a tie!`;
        } else {
            playerTurnHeader.textContent = `Player ${activePlayer} WON!!!`;
        }

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
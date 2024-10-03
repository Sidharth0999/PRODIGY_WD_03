const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const winCondition = winningCombinations[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusMessage.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusMessage.textContent = `It's a Draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusMessage.textContent = `Player X's turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

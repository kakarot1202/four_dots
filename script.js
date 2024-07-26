// script.js
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');
    const rows = 6;
    const columns = 7;
    let currentPlayer = 'red';
    let gameActive = true;
    const cells = [];

    // Initialize the game board
    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        gameBoard.appendChild(cell);
        cells.push(cell);
    }

    // Add event listener for clicks on the game board
    gameBoard.addEventListener('click', (event) => {
        if (!gameActive) return;

        const index = parseInt(event.target.dataset.index);
        if (isNaN(index)) return;

        const column = index % columns;
        let row = rows - 1;

        while (row >= 0) {
            const cellIndex = row * columns + column;
            const cell = cells[cellIndex];

            if (!cell.classList.contains('red') && !cell.classList.contains('yellow')) {
                cell.classList.add(currentPlayer);
                if (checkForWin(row, column)) {
                    alert(`${currentPlayer.toUpperCase()} wins!`);
                    gameActive = false;
                } else {
                    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                }
                break;
            }

            row--;
        }
    });

    // Reset the game
    resetButton.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.classList.remove('red', 'yellow');
        });
        currentPlayer = 'red';
        gameActive = true;
    });

    function checkForWin(row, col) {
        return checkDirection(row, col, 1, 0) || // Horizontal
               checkDirection(row, col, 0, 1) || // Vertical
               checkDirection(row, col, 1, 1) || // Diagonal /
               checkDirection(row, col, 1, -1);  // Diagonal \
    }

    function checkDirection(row, col, rowStep, colStep) {
        let count = 0;
        for (let i = -3; i <= 3; i++) {
            const r = row + i * rowStep;
            const c = col + i * colStep;
            if (r >= 0 && r < rows && c >= 0 && c < columns && cells[r * columns + c].classList.contains(currentPlayer)) {
                count++;
                if (count === 4) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }
});

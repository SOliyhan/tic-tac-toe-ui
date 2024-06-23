document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    const message = document.getElementById('message');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = Array(9).fill('');

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    resetButton.addEventListener('click', resetGame);

    function handleCellClick(index) {
        if (gameState[index] !== '' || !gameActive) {
            return;
        }

        gameState[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        cells[index].classList.add(currentPlayer.toLowerCase());

        if (checkWinCondition()) {
            gameActive = false;
            message.textContent = `Player ${currentPlayer} has won!`;
            return;
        }

        if (!gameState.includes('')) {
            gameActive = false;
            message.textContent = 'Draw!';
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWinCondition() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                condition.forEach(index => cells[index].classList.add('winning'));
                return true;
            }
        }
        return false;
    }

    function resetGame() {
        gameState = Array(9).fill('');
        gameActive = true;
        currentPlayer = 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
    }
});

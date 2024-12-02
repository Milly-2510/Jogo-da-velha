const board = document.getElementById('board');
        const status = document.querySelector('.status');
        const restartButton = document.getElementById('restartButton');
        let gameBoard = ['','','','','','','','',''];
        let isPlayerTurn = true;
        let gameOver = false;
       

        // Função para desenhar o tabuleiro
        function drawBoard() {
            board.innerHTML = '';
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.index = i;
                cell.textContent = gameBoard[i];
                if (gameBoard[i]) {
                    cell.classList.add('taken');
                }
                cell.addEventListener('click', handleClick);
                board.appendChild(cell);
            }
        }

        // Função que trata os cliques do jogador
        function handleClick(event) {
            const index = event.target.dataset.index;
            if (gameBoard[index] || gameOver || !isPlayerTurn) return;

            gameBoard[index] = 'X';
            isPlayerTurn = false;
            checkWinner('X');
            drawBoard();

            if (!gameOver) {
                setTimeout(() => botTurn(), 500);
            }
        }

        // Função que define a jogada do bot
        function botTurn() {
            const emptyCells = gameBoard.map((value, index) => value === '' ? index : -1).filter(index => index !== -1);
            const botMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            gameBoard[botMove] = 'O';
            checkWinner('O');
            drawBoard();
            if (!gameOver) {
                isPlayerTurn = true;
                status.textContent = 'Seu turno!';
            }
        }

        // Função para verificar se há um vencedor
        function checkWinner(player) {
            const winningCombinations = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            for (let combination of winningCombinations) {
                const [a, b, c] = combination;
                if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
                    gameOver = true;
                    status.textContent = player === 'X' ? 'Você ganhou!' : 'O bot ganhou!';
                    return;
                }
            }

            if (!gameBoard.includes('')) {
                gameOver = true;
                status.textContent = 'Empate!';
            }
        }

        // Função para reiniciar o jogo
        function restartGame() {
            gameBoard = ['','','','','','','','',''];
            isPlayerTurn = true;
            gameOver = false;
            status.textContent = 'Seu turno!';
            drawBoard();
        }

        // Inicializa o tabuleiro
        drawBoard();

        // Evento de reiniciar o jogo
        restartButton.addEventListener('click', restartGame);
  
       
     
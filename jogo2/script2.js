
        let board = ['', '', '', '', '', '', '', '', ''];
        let currentPlayer = 'X';
        let gameOver = false;
        const statusDisplay = document.querySelector('.status');
        const boardElement = document.getElementById('board');

        // Função para desenhar o tabuleiro
        function drawBoard() {
            boardElement.innerHTML = '';  // Limpa o tabuleiro
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.index = i;
                cell.textContent = board[i];
                if (board[i]) cell.classList.add('taken');
                cell.addEventListener('click', handleCellClick);
                boardElement.appendChild(cell);
            }
        }

        // Função para tratar o clique nas células
        function handleCellClick(event) {
            const index = event.target.dataset.index;

            // Se a célula já estiver ocupada ou o jogo acabou, não faz nada
            if (board[index] || gameOver) return;

            // Atualiza o tabuleiro com a jogada
            board[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            // Verifica se alguém ganhou ou se houve empate
            if (checkWinner(currentPlayer)) {
                statusDisplay.textContent = `Jogador ${currentPlayer} venceu!`;
                gameOver = true;
            } else if (board.every(cell => cell)) {
                statusDisplay.textContent = 'Empate!';
                gameOver = true;
            } else {
                // Troca o turno
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                statusDisplay.textContent = `Jogador ${currentPlayer} - Seu turno!`;
            }
        }

        // Função para verificar se alguém ganhou
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
                if (board[a] === player && board[b] === player && board[c] === player) {
                    return true;
                }
            }
            return false;
        }

        // Função para reiniciar o jogo
        function restartGame() {
            board = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 'X';
            gameOver = false;
            statusDisplay.textContent = `Jogador 1 (X) - Seu turno!`;
            drawBoard();
        }

        // Inicializa o tabuleiro
        drawBoard();
  
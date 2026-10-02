(function() {
    const I = [
        [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
        ],
        [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
        ],
        [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ]
    ];

    const J = [
        [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 1],
            [0, 1, 0],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 1]
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ]
    ];

    const L = [
        [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [1, 0, 0]
        ],
        [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ]
    ];

    const O = [
        [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ]
    ];

    const S = [
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1]
        ],
        [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]
        ],
        [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    ];

    const T = [
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    ];

    const Z = [
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1]
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0]
        ]
    ];

    window.initTetrisEasterEgg = function() {
        const cvs = document.getElementById("tetris-canvas");
        if (!cvs) return;
        const ctx = cvs.getContext("2d");
        const scoreElement = document.getElementById("tetris-score");

        const ROW = 20;
        const COL = 10;
        const SQ = 20;
        const VACANT = "WHITE";

        // Desativa a barra de rolagem da página
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        function drawSquare(x, y, color) {
            ctx.fillStyle = color;
            ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

            ctx.strokeStyle = "BLACK";
            ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
        }

        let board = [];
        for (let r = 0; r < ROW; r++) {
            board[r] = [];
            for (let c = 0; c < COL; c++) {
                board[r][c] = VACANT;
            }
        }

        function drawBoard() {
            for (let r = 0; r < ROW; r++) {
                for (let c = 0; c < COL; c++) {
                    drawSquare(c, r, board[r][c]);
                }
            }
        }

        drawBoard();

        const PIECES = [
            [Z, "red"],
            [S, "green"],
            [T, "purple"],
            [O, "yellow"],
            [L, "orange"],
            [I, "cyan"],
            [J, "blue"],
        ];

        function randomPiece() {
            let r = Math.floor(Math.random() * PIECES.length);
            return new Piece(PIECES[r][0], PIECES[r][1]);
        }

        function updatescore(linhas) {
            if (linhas === 0) return 0;
            if (linhas === 1) return 1;
            if (linhas === 2) return 1;
            if (linhas === 3) return 4;
            if (linhas === 4) return 18;
            return 0;
        }

        function Piece(tetromino, color) {
            this.tetromino = tetromino;
            this.color = color;
            this.tetrominoN = 0;
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.x = 3;
            this.y = -2;
        }

        Piece.prototype.fill = function (color) {
            for (let r = 0; r < this.activeTetromino.length; r++) {
                for (let c = 0; c < this.activeTetromino.length; c++) {
                    if (this.activeTetromino[r][c]) {
                        drawSquare(this.x + c, this.y + r, color);
                    }
                }
            }
        };

        Piece.prototype.draw = function () {
            this.fill(this.color);
        };

        Piece.prototype.unDraw = function () {
            this.fill(VACANT);
        };

        Piece.prototype.moveDown = function () {
            if (!this.collision(0, 1, this.activeTetromino)) {
                this.unDraw();
                this.y++;
                this.draw();
            } else {
                this.lock();
                p = randomPiece();
            }
        };

        Piece.prototype.moveRight = function () {
            if (!this.collision(1, 0, this.activeTetromino)) {
                this.unDraw();
                this.x++;
                this.draw();
            }
        };

        Piece.prototype.moveLeft = function () {
            if (!this.collision(-1, 0, this.activeTetromino)) {
                this.unDraw();
                this.x--;
                this.draw();
            }
        };

        Piece.prototype.rotate = function () {
            let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
            let kick = 0;

            if (this.collision(0, 0, nextPattern)) {
                if (this.x > COL / 2) {
                    kick = -1;
                } else {
                    kick = 1;
                }
            }

            if (!this.collision(kick, 0, nextPattern)) {
                this.unDraw();
                this.x += kick;
                this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
                this.activeTetromino = this.tetromino[this.tetrominoN];
                this.draw();
            }
        };

        let score = 0;
        let cont = 0;
        let gameOver = false;

        Piece.prototype.lock = function () {
            for (let r = 0; r < this.activeTetromino.length; r++) {
                for (let c = 0; c < this.activeTetromino.length; c++) {
                    if (!this.activeTetromino[r][c]) {
                        continue;
                    }

                    if (this.y + r < 0) {
                        gameOver = true;
                        setTimeout(function() {
                            alert("Game Over! Pressione F5 para recarregar a página.");
                        }, 50);
                        break;
                    }

                    board[this.y + r][this.x + c] = this.color;
                }
            }

            if (gameOver) return;

            for (let r = 0; r < ROW; r++) {
                let isRowFull = true;
                for (let c = 0; c < COL; c++) {
                    isRowFull = isRowFull && board[r][c] !== VACANT;
                }
                if (isRowFull) {
                    for (let y = r; y > 1; y--) {
                        for (let c = 0; c < COL; c++) {
                            board[y][c] = board[y - 1][c];
                        }
                    }

                    for (let c = 0; c < COL; c++) {
                        board[0][c] = VACANT;
                    }
                    cont++;
                    score += updatescore(cont);
                }
            }
            cont = 0;

            drawBoard();

            if (scoreElement) {
                scoreElement.innerText = score;
            }
        };

        Piece.prototype.collision = function (x, y, piece) {
            for (let r = 0; r < piece.length; r++) {
                for (let c = 0; c < piece.length; c++) {
                    if (!piece[r][c]) {
                        continue;
                    }

                    let newX = this.x + c + x;
                    let newY = this.y + r + y;

                    if (newX < 0 || newX >= COL || newY >= ROW) {
                        return true;
                    }

                    if (newY < 0) {
                        continue;
                    }

                    if (board[newY][newX] !== VACANT) {
                        return true;
                    }
                }
            }
            return false;
        };

        let p = randomPiece();
        let dropStart = Date.now();

        function CONTROL(event) {
            if (gameOver) return;
            if (event.keyCode === 37) { // Seta esquerda
                event.preventDefault();
                p.moveLeft();
                dropStart = Date.now();
            } else if (event.keyCode === 38) { // Seta cima (girar)
                event.preventDefault();
                p.rotate();
                dropStart = Date.now();
            } else if (event.keyCode === 39) { // Seta direita
                event.preventDefault();
                p.moveRight();
                dropStart = Date.now();
            } else if (event.keyCode === 40) { // Seta baixo
                event.preventDefault();
                p.moveDown();
            }
        }

        document.addEventListener("keydown", CONTROL);

        function drop() {
            let now = Date.now();
            let delta = now - dropStart;
            if (delta > 1000) {
                p.moveDown();
                dropStart = Date.now();
            }
            if (!gameOver) {
                requestAnimationFrame(drop);
            }
        }

        drop();
    };
})();

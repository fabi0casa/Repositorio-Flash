//CVS é abreviação para CanvasRenderedContext, muitos exemplos com canva utilizavam esse nome mas pode ser qualquer coisa
const cvs = document.getElementById("tetris");
//CTX é abreviação para Context
const ctx = cvs.getContext("2d");
//variavel para a pontuação
const scoreElement = document.getElementById("score");
//Definir a quantidade de linhas como 20
const ROW = 20;
//Definir a quantidade de colunas como 10
const COL = (COLUMN = 10);
//Definir o tamanho do quadrado como 20px
const SQ = (squareSize = 20);
//Definir o quadrado Nulo|Vacant como branco
const VACANT = "WHITE";
//Função para desativar o scroll para a pagina não acompanhar o scroll enquanto joga
function unloadScrollBars() {
  document.documentElement.style.overflow = "hidden";
  document.body.scroll = "no";
}
//Função para definir o quadrados do tabuleiro
function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

  ctx.strokeStyle = "BLACK";
  ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

//Definir o tabuleiro no canvas do HTML e preencher com Vacant|Nulo
let board = [];
for (r = 0; r < ROW; r++) {
  board[r] = [];
  for (c = 0; c < COL; c++) {
    board[r][c] = VACANT;
  }
}
//Função para desenhar o tabuleiro
function drawBoard() {
  for (r = 0; r < ROW; r++) {
    for (c = 0; c < COL; c++) {
      drawSquare(c, r, board[r][c]);
    }
  }
}
//chamando a função apenas uma vez
drawBoard();
unloadScrollBars();

//Definir a cor das peças, as peças foram declarados no arquivo tetrominos.js
const PIECES = [
  [Z, "red"],
  [S, "green"],
  [T, "purple"],
  [O, "yellow"],
  [L, "orange"],
  [I, "cyan"],
  [J, "blue"],
];

//Funçao que utiliza o math.random para selecionar uma peça aleatoria
function randomPiece() {
  let r = (randomN = Math.floor(Math.random() * PIECES.length));
  return new Piece(PIECES[r][0], PIECES[r][1]);
}
//Definir a peça aleatoria para uma variavel
let p = randomPiece();
//Função que retorna um numero para somar com a pontuação, ela sendo a fatorial do numero de linhas concluidas
function updatescore(linhas) {
  if (linhas === 0) {
    return 0;
  }
  if (linhas === 1) {
    return 1;
  }
  if (linhas === 2) {
    return 1;
  }
  if (linhas === 3) {
    return 4;
  }
  if (linhas === 4) {
    return 18;
  }
}
//Função que define qual peça e qual cor vai ser e desenha a peça no tabuleiro
function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;

  this.tetrominoN = 0;
  this.activeTetromino = this.tetromino[this.tetrominoN];

  this.x = 3;
  this.y = -2;
}

//Preenche a peça com a cor definida na Const PIECES da linha 52
Piece.prototype.fill = function (color) {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, color);
      }
    }
  }
};

//Desenha a peça//
Piece.prototype.draw = function () {
  this.fill(this.color);
};

//Apaga a peça//
Piece.prototype.unDraw = function () {
  this.fill(VACANT);
};

//Sequencia de apagar e desenhar a peça para dar um efeito de cair a peça, ao colidir trava a peça//
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

//Função para movimentar a peça para a direita apagando o anterior e desenhando o atual
Piece.prototype.moveRight = function () {
  if (!this.collision(1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x++;
    this.draw();
  }
};

//Função para movimentar a peça para a esquerda apagando o anterior e desenhando o atual
Piece.prototype.moveLeft = function () {
  if (!this.collision(-1, 0, this.activeTetromino)) {
    this.unDraw();
    this.x--;
    this.draw();
  }
};

//Função para rotacionar a peça
Piece.prototype.rotate = function () {
  let nextPattern =
    this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
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
//Definir a variavel para pontuação score como 0
let score = 0;
//Função que verifica se a ultima peça travada atingiu o limite vertical do tabuleiro, se sim define o Gameover como verdadeiro
Piece.prototype.lock = function () {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      if (!this.activeTetromino[r][c]) {
        continue;
      }

      if (this.y + r < 0) {
        alert("Game Over");

        gameOver = true;
        break;
      }

      board[this.y + r][this.x + c] = this.color;
    }
  }

  //Verificar se a linha está cheia para excluir ela e atualizar a pontuação
  for (r = 0; r < ROW; r++) {
    let isRowFull = true;
    for (c = 0; c < COL; c++) {
      isRowFull = isRowFull && board[r][c] != VACANT;
    }
    if (isRowFull) {
      for (y = r; y > 1; y--) {
        for (c = 0; c < COL; c++) {
          board[y][c] = board[y - 1][c];
        }
      }

      for (c = 0; c < COL; c++) {
        board[0][c] = VACANT;
      }
      cont++;
      score += updatescore(cont);
    }
  }
  //Resetar o contador da linha, utilizado para atualizar o pontuação
  cont = 0;

  drawBoard();

  //Atualizar o pontuação no front end HTML
  scoreElement.innerHTML = score;
};

//Função para definir a colisão das paredes
Piece.prototype.collision = function (x, y, piece) {
  for (r = 0; r < piece.length; r++) {
    for (c = 0; c < piece.length; c++) {
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

      if (board[newY][newX] != VACANT) {
        return true;
      }
    }
  }
  return false;
};

//Controle das setas do teclado
document.addEventListener("keydown", CONTROL);

function CONTROL(event) {
  if (event.keyCode == 37) {
    p.moveLeft();
    dropStart = Date.now();
  } else if (event.keyCode == 38) {
    p.rotate();
    dropStart = Date.now();
  } else if (event.keyCode == 39) {
    p.moveRight();
    dropStart = Date.now();
  } else if (event.keyCode == 40) {
    p.moveDown();
  }
}

//Define a variavel para inicializar o jogo e uma função para as peças cairem automaticamente
let dropStart = Date.now();
let gameOver = false;
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
//Chama a função drop
drop();

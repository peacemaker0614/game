const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let gameOver = false;
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const replayButton = document.getElementById('replayButton');

const character = {
    x: 50,
    y: 300,
    width: 80,  // 캐릭터 크기 2배
    height: 80, // 캐릭터 크기 2배
    color: 'red',
    dy: 0,
    gravity: 0.5,
    jumpPower: -18, // 점프 높이 2배
    isJumping: false
};

const obstacle = {
    x: canvas.width,
    y: 350, // 장애물을 바닥에 붙임
    width: 50,
    height: 50,
    color: 'green',
    dx: -5
};

function drawCharacter() {
    ctx.fillStyle = character.color;
    ctx.fillRect(character.x, character.y, character.width, character.height);
}

function drawObstacle() {
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    character.dy += character.gravity;
    character.y += character.dy;

    if (character.y + character.height > canvas.height) {
        character.y = canvas.height - character.height;
        character.dy = 0;
        character.isJumping = false;
    }

    obstacle.x += obstacle.dx;
    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = canvas.width;
        score += 100;
        scoreElement.textContent = `Score: ${score}`;
    }

    if (character.x < obstacle.x + obstacle.width &&
        character.x + character.width > obstacle.x &&
        character.y < obstacle.y + obstacle.height &&
        character.y + character.height > obstacle.y) {
        score -= 50;
        scoreElement.textContent = `Score: ${score}`;
        if (score <= -100) {
            gameOver = true;
            gameOverElement.style.display = 'block';
            replayButton.style.display = 'block';
        }
    }

    drawCharacter();
    drawObstacle();

    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && !character.isJumping) {
        character.dy = character.jumpPower;
        character.isJumping = true;
    }
    if (event.key === 'ArrowLeft') {
        character.x -= 10;
    }
    if (event.key === 'ArrowRight') {
        character.x += 10;
    }
});

document.addEventListener('mousedown', () => {
    if (!character.isJumping) {
        character.dy = character.jumpPower;
        character.isJumping = true;
    }
});

document.addEventListener('touchstart', () => {
    if (!character.isJumping) {
        character.dy = character.jumpPower;
        character.isJumping = true;
    }
});

function replayGame() {
    score = 0;
    gameOver = false;
    character.x = 50;
    character.y = 300;
    obstacle.x = canvas.width;
    scoreElement.textContent = `Score: ${score}`;
    gameOverElement.style.display = 'none';
    replayButton.style.display = 'none';
    update();
}

update();

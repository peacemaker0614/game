document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});

let score = 0;
let gameInterval;

function jump() {
    let character = document.getElementById('character');
    if (!character.classList.contains('jump')) {
        character.classList.add('jump');
        setTimeout(function() {
            character.classList.remove('jump');
        }, 1000);
    }
}

function updateScore(points) {
    score += points;
    document.getElementById('score').innerText = `Score: ${score}`;
    if (score <= -100) {
        alert('Game Over!');
        clearInterval(gameInterval);
        resetGame();
    }
}

function resetGame() {
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
    let obstacle = document.getElementById('obstacle');
    obstacle.style.animation = 'moveObstacle 2s linear infinite';
    obstacle.style.display = 'block';
    gameInterval = setInterval(checkCollision, 10);
}

function checkCollision() {
    let character = document.getElementById('character');
    let obstacle = document.getElementById('obstacle');

    let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

    if (obstacleLeft < 100 && obstacleLeft > 0 && characterBottom <= 100) {
        updateScore(-50);
    } else if (obstacleLeft < 0) {
        updateScore(100);
    }
}

gameInterval = setInterval(checkCollision, 10);

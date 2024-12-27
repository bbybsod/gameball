const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 2,
    dy: 2,
    color: 'red'
};

// Paddle properties
let paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    width: 100,
    height: 10,
    speed: 5,
    color: 'white',
    dx: 0
};

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    moveBall();
    movePaddle();
    detectCollisions();
    requestAnimationFrame(gameLoop);
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}


function drawPaddle() {
    ctx.fillStyle = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Game over condition
    if (ball.y + ball.radius > canvas.height) {
        alert('Game Over!');
        document.location.reload();
    }
}

// Move the paddle
function movePaddle() {
    paddle.x += paddle.dx;

    // Prevent the paddle from going out of bounds
    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
}

// Detect collisions between ball and paddle
function detectCollisions() {
    if (
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width &&
        ball.y + ball.radius > paddle.y
    ) {
        ball.dy *= -1;
    }
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') paddle.dx = -paddle.speed;
    if (e.key === 'ArrowRight') paddle.dx = paddle.speed;
});

document.addEventListener('keyup', () => {
    paddle.dx = 0;
});

// Start the game loop
gameLoop();
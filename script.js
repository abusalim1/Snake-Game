const gameArea = document.querySelector('.game-area');
let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let dx = 0;
let dy = 0;
let interval;

function startGame() {
    createFood();
    interval = setInterval(moveSnake, 100);
}

function createFood() {
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
    const foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.left = food.x + 'px';
    foodElement.style.top = food.y + 'px';
    gameArea.appendChild(foodElement);
}

function moveSnake() {
    const newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(newHead);
    if (newHead.x === food.x && newHead.y === food.y) {
        createFood();
    } else {
        snake.pop();
    }
    renderSnake();
}

function renderSnake() {
    const snakeElements = document.querySelectorAll('.snake');
    snakeElements.forEach(element => {
        element.remove();
    });
    snake.forEach(part => {
        const snakeElement = document.createElement('div');
        snakeElement.classList.add('snake');
        snakeElement.style.left = part.x + 'px';
        snakeElement.style.top = part.y + 'px';
        gameArea.appendChild(snakeElement);
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && dy !== 20) {
        dx = 0;
        dy = -20;
    } else if (e.key === 'ArrowDown' && dy !== -20) {
        dx = 0;
        dy = 20;
    } else if (e.key === 'ArrowLeft' && dx !== 20) {
        dx = -20;
        dy = 0;
    } else if (e.key === 'ArrowRight' && dx !== -20) {
        dx = 20;
        dy = 0;
    }
});

startGame();
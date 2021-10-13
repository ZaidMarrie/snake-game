document.addEventListener('DOMContentLoaded', () => {
    const scoreEl = document.querySelector('.score');
    const speedEl = document.querySelector('.speed');
    const gameGrid = document.querySelector('.game-grid');
    const startBtn = document.querySelector('#start-btn');

    let snake = [2, 1, 0];
    let intervalTime = 0;
    let foodIndex = 0;
    let gridSquares = [];
    let score = 0;
    let speed = 1;
    let width = 15;
    let direction = 1;
    let intervalId = 0;

    function createGrid() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            gameGrid.appendChild(square);
            gridSquares.push(square);
        }
    }

    function startGame() {
        gridSquares = []
        createGrid();
        drawSnake();
        snake = [2, 1, 0];
        intervalTime = 1000;
        foodIndex = 0;
        score = 0;
        speed = 1;
        speedEl.textContent = `X${speed}`;
        scoreEl.textContent = score;
        generateFood();
        intervalId = setInterval(snakeMovement, intervalTime);
        startBtn.classList.remove('start-btn');
    }

    function drawSnake() {
        snake.forEach(index => gridSquares[index].classList.add('snake'));
    }

    function snakeMovement() {

        if (
            (snake[0] - width < 0 && direction === -15) ||
            (snake[0] + width >= width * width && direction === 15) ||
            (snake[0] % 15 === 0 && direction === -1) ||
            (snake[0] % 15 === 14 && direction === 1) || 
            (gridSquares[snake[0] + direction].classList.contains('snake'))
           ) {
                startBtn.classList.add('start-btn');
                return clearInterval(intervalId);
        }

        const tail = snake.pop();
        gridSquares[tail].classList.remove('snake');
        snake.unshift(snake[0] + direction);
        drawSnake();

        if (gridSquares[snake[0]].classList.contains('food')) {
            gridSquares[snake[0]].classList.remove('food');

            gridSquares[tail].classList.add('snake');
            snake.push(tail)

            score += 10;
            scoreEl.textContent = score;
            speedGameUp();
            generateFood();
        }
    }

    function generateFood() {
        do {
            foodIndex = Math.floor(Math.random() * gridSquares.length);
        } while (gridSquares[foodIndex].classList.contains('snake'))
        gridSquares[foodIndex].classList.add('food');
    }

    function speedGameUp() {
        if (score >= 50 && score < 100) {
            intervalTime = 500;
            speed = 2;
            speedEl.textContent = `X${speed}`;
            intervalId = setInterval(snakeMovement, intervalTime);
        } else if (score > 100 && score < 150) {
            intervalTime = 250;
            speed = 3;
            speedEl.textContent = `X${speed}`;
            intervalId = setInterval(snakeMovement, intervalTime);
        } else if (score > 150 && score < 200) {
            intervalTime = 125;
            speed = 4;
            speedEl.textContent = `X${speed}`;
            intervalId = setInterval(snakeMovement, intervalTime);
        }
    }

    function gameControl(e) {
        switch (e.key) {
            case "Up":
            case "ArrowUp":
                direction = -15;
                break;
        
            case "Down":
            case "ArrowDown":
                direction = 15;
                break;

            case "Left":
            case "ArrowLeft":
                direction = -1;
                break;

            case "Right":
            case "ArrowRight":
                direction = 1;
                break;
        }
    }

    startBtn.addEventListener('click', startGame)
    document.addEventListener('keydown', gameControl);
});
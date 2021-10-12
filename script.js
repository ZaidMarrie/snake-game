const gameGrid = document.querySelector('.game-grid');
const startButton = document.querySelector('.start-btn');
const scoreElement = document.querySelector('.score');
const speedElement = document.querySelector('.speed');
let gridSquares = [];
let snake = [55, 54, 53];
let direction = 1;
const squareWidth = 10;
let score = 0;
let intervalTime = 1000;
let speedMultiplier = 0.9;
let timerId = 0;
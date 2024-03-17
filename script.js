// Author: Hamza EL GHAZOUANI

// Get the elements from the DOM :
const ball  = document.getElementById('ball');
const paddle = document.getElementById('paddle');

const level = document.getElementById('level');
const score = document.getElementById('score');

const start = document.getElementById('start');
const pause = document.getElementById('pause');
const reset = document.getElementById('reset');

const gameOver = document.getElementById('gameOver');


// Set the initial position of the ball :
let directionX = Math.floor(Math.random() * 2)+1;
let directionY = 1;

// Enum for the direction of the ball :
const DirectionX = {
    UP: 1,
    DOWN: 2,
}
const DirectionY = {
    RIGHT: 1,
    LEFT: 2
}

const Level = {
    EASY: 1,
    MEDIUM: 2,
    HARD: 3
}

params = () => {
    parseInt(score.innerText) == 10 ? level.innerText = Level.EASY : parseInt(score.innerText) == 20 ? level.innerText = Level.MEDIUM : parseInt(score.innerText) == 30 ? level.innerText = Level.HARD : '';
    switch (parseInt(level.innerText)) {
        case Level.EASY:
            clearInterval(counter);
            counter = setInterval(angelMove, 10);
        break;
        case Level.MEDIUM:
            clearInterval(counter);
            counter = setInterval(angelMove, 5);
        break;
        case Level.HARD:
            clearInterval(counter);
            counter = setInterval(angelMove, 1);
        break;
    }

    if(parseInt(score.innerText) < 0){
        clearInterval(counter);
        gameOver.style.display = 'flex';
        gameOver.style.opacity = 1;
        document.removeEventListener('keydown', handlKey);
    }
}


// Function to handle the ball movement :
angelMove = () => {
    if(paddle.offsetLeft >= ball.offsetLeft-100 && paddle.offsetLeft < ball.offsetLeft && ball.offsetTop+10 >= 670){
        directionX = DirectionX.UP;
        score.innerText++;
    }
    params();

    switch (ball.offsetTop) {
        case 10:
            directionX = DirectionX.DOWN;
        break;
        case 690:
            directionX = DirectionX.UP;
            score.innerText--;
        break;
    }
    switch (ball.offsetLeft) {
        case 10:
            directionY = DirectionY.RIGHT;
        break;
        case 1160:
            directionY = DirectionY.LEFT;
        break;
    }
    switch (directionX) {
        case DirectionX.UP:
            ball.style.top = `${ball.offsetTop - 10}px`;
        break;
        case DirectionX.DOWN:
            ball.style.top = `${ball.offsetTop + 10}px`;
        break;
    }
    switch (directionY) {
        case DirectionY.RIGHT:
            ball.style.left = `${ball.offsetLeft + 10}px`;
        break;
        case DirectionY.LEFT:
            ball.style.left = `${ball.offsetLeft - 10}px`;
        break;
    }
}

// Function to handle the key press event :
handleKeyPress = (event) => {
    if (event.key === 'ArrowRight' && paddle.offsetLeft < 1100) {
        paddle.style.left = `${paddle.offsetLeft + 10}px`;
    }else if (event.key === 'ArrowLeft' && paddle.offsetLeft > 0) {
        paddle.style.left = `${paddle.offsetLeft - 10}px`;
    }
}

// Set the event listener for the Game :
var handlKey = document.addEventListener('keydown', handleKeyPress);
var counter = setInterval(angelMove, 10);


// Set the event listener for the buttons :
start.addEventListener('click', () => {
    counter == undefined ? counter = setInterval(angelMove, 10) : null;
});

pause.addEventListener('click', () => {
    clearInterval(counter);
    counter = undefined;
});

reset.addEventListener('click', () => {
    clearInterval(counter);
    counter = undefined;
    ball.style.top = '50%';
    ball.style.left = '0%';
    paddle.style.left = '50%';
    gameOver.style.display = 'none';
    gameOver.style.opacity = 0;
    directionX = Math.floor(Math.random() * 2)+1;
    directionY = 1;
    score.innerText = 10;
    level.innerText = Level.EASY;
});
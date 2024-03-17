// Author: Hamza EL GHAZOUANI

// Get the elements from the DOM :
const ball  = document.getElementById('ball');
const paddle = document.getElementById('paddle');

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


// Function to handle the ball movement :
angelMove = () => {
    if(paddle.offsetLeft >= ball.offsetLeft-100 && paddle.offsetLeft < ball.offsetLeft && ball.offsetTop+10 >= 670){
        directionX = DirectionX.UP;
    }
    switch (ball.offsetTop) {
        case 10:
            directionX = DirectionX.DOWN;
        break;
        case 690:
            directionX = DirectionX.UP;
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
document.addEventListener('keydown', handleKeyPress);
var counter = setInterval(angelMove, 10);

let canvas = document.querySelector('#canvas');
let game = setInterval(draw, 10);
let ctx = canvas.getContext('2d');
// canvas
let x = canvas.width / 2;
let y = canvas.height - 30;
// movement
let dx = 2;
let dy = -2;
let ballRadius = 10;
// paddle
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
// keypress
let rightPressed = false;
let leftPressed = false;
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
// color
let red;
let green;
let blue;

function getRandomColor() {
    red = Math.floor(Math.random() * 255);
    green = Math.floor(Math.random() * 255);
    blue = Math.floor(Math.random() * 255);
}

// draw
console.log(red);
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;
    if(y + dy < 0 + ballRadius) {
        getRandomColor();
        dy = -dy;
    } else if(x + dx < 0 + ballRadius || x + dx> canvas.width - ballRadius) {
        getRandomColor();
        dx = -dx;
    } else if(y > canvas.height - paddleHeight - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            document.location.reload();
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 4;
    } else if(leftPressed && paddleX > 0) {
        paddleX -= 4;
    }

}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    if(ctx.fillStyle === '#eeeeee') {
        getRandomColor();
    }
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

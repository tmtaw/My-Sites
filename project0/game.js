const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const basketWidth = 100;
const basketHeight = 20;
let basketX = (canvas.width - basketWidth) / 2;

const boxWidth = 30;
const boxHeight = 30;
let boxX = Math.random() * (canvas.width - boxWidth);
let boxY = 0;

let score = 0;
let gameOver = false;

function drawBasket() {
    ctx.fillStyle = "blue";
    ctx.fillRect(basketX, canvas.height - basketHeight, basketWidth, basketHeight);
}

function drawBox() {
    ctx.fillStyle = "red";
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
}

function drawScore() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 20);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    if (gameOver) {
        ctx.font = "40px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
        return;
    }

    clearCanvas();
    drawBasket();
    drawBox();
    drawScore();

    boxY += 5;

    if (boxY + boxHeight > canvas.height) {
        if (boxX > basketX && boxX < basketX + basketWidth) {
            score++;
            boxY = 0;
            boxX = Math.random() * (canvas.width - boxWidth);
        } else {
            gameOver = true;
        }
    }

    requestAnimationFrame(update);
}

document.addEventListener("mousemove", (e) => {
    basketX = e.clientX - basketWidth / 2;
});

update();
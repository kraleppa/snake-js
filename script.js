const cvs = document.getElementById("canvas");
const ctx = cvs.getContext('2d');
const box = 32;
let score = 0;
const scoreDiv = document.querySelector("#score");
scoreDiv.innerText = score;

let snake = [];

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};


let d;      //key direction

//event listener (snake controller)
const direction = function(event){
    let key = event.keyCode;
        if (key == 37 && d != "RIGHT"){
            d = "LEFT";
        }else if (key == 38 && d != "DOWN"){
            d = "UP";
        }else if (key == 39 && d != "LEFT"){
            d = "RIGHT";
        }else if (key == 40 && d != "UP"){
            d = "DOWN";
        }
};

document.addEventListener("keydown", direction);

const drawMap = function(){
    ctx.fillStyle = "#004d00";
    ctx.fillRect(0,0,19*box, 19*box);

    ctx.fillStyle = "#006600"
    ctx.fillRect(0, 2 * box, 19*box, 17*box)

    for (let y = 3; y <= 17; y++){
        for (let x = 1; x <= 17; x++){
            if ((x + y)% 2 == 0){
                ctx.fillStyle = "#269900"
                ctx.fillRect(x*box, y* box, box, box)
            }else{
                ctx.fillStyle = "#2db300"
                ctx.fillRect(x*box, y* box, box, box)
            }
        } 
    }
};

drawMap();

const collision = function(head, array){
    for (let i = 0; i < array.length; i++){
        if (head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
};

const drawSnake = function(){
    ctx.fillStyle = "White";
    snake.forEach(snakeNode => ctx.fillRect(snakeNode.x, snakeNode.y, box, box));
};

const drawFood = function(){
    ctx.fillStyle = "Red";
    ctx.fillRect(food.x, food.y, box, box);
};



const mainDraw = function(){
    console.log('eluwina');
    drawMap();
    drawSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    switch(d){
        case "LEFT": snakeX -= box; break;
        case "UP": snakeY -= box; break;
        case "RIGHT": snakeX += box; break;
        case "DOWN": snakeY += box; break;
    }

    if (snakeX == food.x && snakeY == food.y){
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
        score++;
    }else{
        snake.pop();
    }

    scoreDiv.innerText = score;

    let newHead = { 
        x: snakeX,
        y: snakeY
    }

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box 
        || snakeY > 17 * box || collision(newHead, snake)){
        clearInterval(game);
    }
    snake.unshift(newHead);
};


let game;
const startGame = function(){
    d = null;
    score = 0;
    snake = [];
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    };
    game = setInterval(mainDraw, 100);
};
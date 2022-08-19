// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let a = 1;
let b = 20;     //no. of grids
let snakeArr = [
    {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
];

food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(snakeArr[0].y/5)+2};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

//ending game
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x > b || snake[0].x <=0 || snake[0].y > b || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        
        alert("Game Over. Play again!" + '\n' +"your score: " + score);
        score = 0;
        speed = 1;
        scoreBox.innerHTML = "Score: " + score; 
        inputDir =  {x: 0, y: 0}; 
        snakeArr = [{x: Math.round(a+ (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}];
        musicSound.currentTime = 0;
        musicSound.play();
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score%2==0){
            speed+=2;
        }
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.push({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y}); //add new element to array
        //creating next food
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    
    // Moving the snake
    for (let i = snakeArr.length-2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    gamepad = document.getElementsByClassName('gameBox')[0];
    gamepad.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
            //snakeElement.classList.add('tail');
        }
        else{
            snakeElement.classList.add('snake');
        }
        gamepad.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gamepad.appendChild(foodElement);
}


// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    highscoreBox.innerHTML = "HighScore: " + hiscore;
}

//controls
window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{
    e.preventDefault();
    // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            inputDir = {x:0,y:0};
            break;
    }

});
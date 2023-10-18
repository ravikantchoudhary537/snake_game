let inputDir = {x:0,y:0};
let lastPaintTime = 0;
let speed = 2;
let snakeArr = [
    {x:7,y:10}
];
let score = 0;
let food = {x:3,y:5};
const eatsound = new Audio("eat.mp3");
const gameoversound =new  Audio("gameover.mp3");

// function main(ctime){
//     window.requestAnimationFrame(main);
//     if(ctime-lastPaintTime/1000 < 1/speed){
//         return;
//     }
//     lastPaintTime = ctime;
//     gameEngine();
// }
setInterval(function(){
    gameEngine();
},200)

function isColide(snake){
    for(i=1;i<snake.length-1;i++){
        if((snake[0].x===snake[i].x) && (snake[0].y===snake[i].y)){
            return true;
        }
    }
    if(snake[0].x<=0 || snake[0].x >=18 || snake[0].y<=0 || snake[0].y>=18){
        return true;
    }
    return false;
}

function gameEngine(){

            if(isColide(snakeArr)){
                // restart.style.display = "block";
                // snakeElement.style.display = "none";
                // foodElement.style.display = "none";
                gameoversound.play();
                alert("Enter any key to restart");
                inputDir = {x:0,y:0};
                 snakeArr = [
                    {x:7,y:10}
                ];
                score = 0;
            }


    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y+inputDir.y});
        eatsound.play();
        score +=1;
        scorecard.innerHTML = "Score : "+ score;
        let a= 2;
        let b=16;       
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
        
    }


    for(i = snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.style.gridRowStart = e.y;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}




// window.requestAnimationFrame(main); 

window.addEventListener('keydown',function(e){
    inputDir = {x:0,y:1};
    switch(e.key){
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
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
            break;
        
    }
})


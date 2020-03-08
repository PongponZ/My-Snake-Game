//Create By PongponZ

window.onload = () => {
    //get canvas from element
    const cvs = document.getElementById("screen");
    var context = cvs.getContext("2d");
    
    var csvHight = cvs.height;
    var csvWidth = cvs.width;
    
    //set size of snake
    var snakeHeight = 20;
    var snakeWidth = 20;
    var myScore = 0;
    var direction = "right";

    //function for draw score
    drawScore = score => {
        context.fillStyle = "yellow";
        context.font='20px sans-serif';
        context.fillText("SCORE: " + score, 15, csvHight - 15);
    }

    //function for draw snake
    drawSnake = (x , y) =>{
        context.fillStyle = "blue";
        context.fillRect(x * snakeWidth, y * snakeHeight, snakeWidth, snakeHeight);
        context.fillStyle = "red";
        context.strokeRect(x * snakeWidth, y * snakeHeight, snakeWidth, snakeHeight);
    }

    //Create Snake Oject 
    var len = 2;
    var snake = [];
    for (let index = len; index >= 0; index--) {
        snake.push({ x:index, y:0 })
    }
    
    //function for draw food
    drawFood = (x, y) =>{
        context.fillStyle = "yellow";
        context.fillRect(x * snakeWidth, y * snakeHeight, snakeWidth, snakeHeight);
        context.fillStyle = "red";
        context.strokeRect(x * snakeWidth, y * snakeHeight, snakeWidth, snakeHeight);
    }

    //Create food Oject
    var food = {
        x: Math.round(Math.random() * (csvWidth / snakeWidth)),
        y: Math.round(Math.random() * (csvHight / snakeHeight))
    };

    //Create function check snake collision 
    checkCollision = (x, y, array) =>{
        for (let index = 1; index < array.length; index++) {
            if(x == array[index].x && y == array[index].y){
                return true;
            }
        }
        return false;
    }

    //Create Draw function for draw and display Evertything
    draw = () => {
        //clear screen every time when call this function
        context.clearRect(0, 0, csvWidth, csvHight);
    
        for (let index = 0; index < snake.length; index++) {
            let x = snake[index].x;
            let y = snake[index].y;
            drawSnake(x, y);
        }

        //draw food
        drawFood(food.x, food.y);

        //Snake head
        var snakeHead_X = snake[0].x;
        var snakeHead_Y = snake[0].y;

        
        //set rule when snake hits the wall ,game over
        if(snakeHead_X < 0 || snakeHead_Y < 0 || snakeHead_X >= (csvWidth/snakeHead_X+7) || snakeHead_Y >= (csvHight/snakeHead_Y+5) || checkCollision(snakeHead_X, snakeHead_Y, snake)){
            location.reload();
        }

        //Direction from Users
        if(direction == "left") snakeHead_X--;
        else if(direction == "up") snakeHead_Y--;
        else if(direction == "right") snakeHead_X++;
        else if(direction == "down") snakeHead_Y++;

        //Snake eat food and not eat
        if(snakeHead_X == food.x && snakeHead_Y == food.y){
            //set new food position
            myScore++;
            food = {
                x: Math.round(Math.random() * (csvWidth / snakeWidth)),
                y: Math.round(Math.random() * (csvHight / snakeHeight))
            };
            // add snake body
            var newHead = {
                x: snakeHead_X,
                y: snakeHead_Y
            };
        }else{
           //remove last array (tail)
           snake.pop();
           var newHead = {
                x: snakeHead_X,
                y: snakeHead_Y
            };
        }
        
        //add new head to snake array
        snake.unshift(newHead)

        //draw Score
        drawScore(myScore);
    }

    //set listener get key from user
    getDirection = e => {
        if (e.keyCode == 37 && direction != "right") {
            direction = "left";
        }else if(e.keyCode == 38 && direction != "down"){
            direction = "up";
        }else if(e.keyCode == 39 && direction != "left"){
            direction = "right";
        }else if(e.keyCode == 40 && direction != "up"){
            direction = "down";
        }
    }
    document.addEventListener("keydown",getDirection);
    


    setInterval(draw, 100);












    
}

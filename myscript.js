let screenCanvas = document.getElementById("screen");
let context = screenCanvas.getContext("2d");



//Create box snake
context.fillStyle = "blue";
//Create Box at position = x 25 y 25 and Size = height 50 width 50 
context.fillRect(25, 25, 20, 20);


//Create feed box
context.fillStyle = "red";
context.fillRect(250, 300, 20, 20);
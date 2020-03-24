const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const ballRadius = 10;

// initial position of the ball
// aprox. the middle of screen

let x = canvas.width/2;
let y = canvas.height - 30;

let dx = 2;
let dy = 2;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let brickRowCount = 3;
let brickColumnCount = 5;
let brickHeight = 20;
let brickWidth = 75;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

// flags
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

// listeners
let bricks = [];

for(let c = 0; c < brickColumnCount; c++){
	bricks[c] = [];
	for(let r = 0; r < brickRowCount; r++){
		bricks[c][r] = { x: 0, y: 0, status:1 };
	}
}

function keyDownHandler(e){
	if(e.keyCode == 39){
		rightPressed = true;
	}
	else if(e.keyCode == 37){
		leftPressed = true;
	}
}

function keyUpHandler(e){
	if(e.keyCode == 39){
		rightPressed = false;
	}
	else if(e.keyCode == 37){
		leftPressed = false;
	}
}

//game

function drawBall(){
	context.beginPath();
	context.arc(x, y, ballRadius, 0, 2*Math.PI);
	context.fillstyle = '#0033ff';
	context.fillStroke = '#0033ff';
	context.Stroke = '10';
	context.fill();
	context.closePath();
}

function drawPaddle(){
	context.beginPath();
	context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	context.fillStyle = '#0095dd';
	context.fill();
	context.closePath();
}

function drawBricks(){
	for(let c=0; c < brickColumnCount; c++){
		for(let r = 0; r < brickRowCount; r++){
			if(bricks[c][r].status == 1) {
				let brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
				let brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				context.beginPath();
				context.rect(brickX, brickY, brickWidth, brickHeight);
				context.fillStyle = '#0095dd';
				context.fill();
				context.closePath();
			}
		}
	}
}

function colisionDetection(){
	for(let c=0; c < brickColumnCount; c++){
		for(let r = 0; r < brickRowCount; r++){
			let b = bricks[c][r];
			if(b.status == 1){
				if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
					dy = -dy;
					b.status = 0;
				}
			}
		}
	}
}

function draw(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	drawBall();
	drawBricks();
	drawPaddle();
	
	colisionDetection();

	if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	if(y+ + dy < ballRadius){
		dy = -dy;
	}
	else if(y + dy > canvas.height - ballRadius){
		if(x > paddleX && x < paddleX + paddleWidth){
			if(y = y - paddleHeight){
				dy = -dy;
			}
		}
		else{
			//game over
			console.log('game over');
			document.location.reload();
		}
	}
	if(rightPressed && paddleX < canvas.width - paddleWidth){
		paddleX += 7;
	}else if(leftPressed && paddleX > 0){
		paddleX -= 7;
	}

	x += dx;
	y += dy;
	
	requestAnimationFrame(draw);
}

draw();

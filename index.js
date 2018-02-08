const GRAVITY = 1.5;
const GROUND = 180;
var counter = 0;
var level = 100;

var img = new Image();
img.src = './img/coin.png';

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var canvas = document.querySelector('.game');
var ctx = canvas.getContext('2d');
canvas.width = '600';
canvas.height = '200';

var speed = 2;
var spacePressed = false;

function drawGround() {
	 ctx.beginPath();
	 ctx.moveTo(0,GROUND);
	 ctx.lineTo(canvas.width,GROUND);
	 ctx.strokeStyle = "#000000";
	 ctx.lineWidth = 2;
	 ctx.stroke();
}

function drawHydrant() {
	ctx.fillStyle = 'rgb(255, 0, 0)';
	ctx.fillRect(x, y, hydrantWidth, hydrantHeight);
}

function keyDownHandler(e) {
    if(e.keyCode == 32) {
        spacePressed = true;                  
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 32) {
        spacePressed = false;
    }
}

class Dog {
    constructor(x,y,size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }
    render() {
        ctx.strokeStyle = 'rgb(0,0,0)';
	    ctx.fillStyle = 'rgb(255,255,255)';
	    ctx.fillRect(this.x,this.y,this.size,this.size);
	    ctx.strokeRect(this.x,this.y, this.size, this.size);
    }
}

class Hydrant {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
		this.width = width;
		this.height = height;
		this.img = new Image();
		this.img.src = './img/coin.png';
	}
	drawImg() {
		ctx.drawImage(this.img,this.width,this.height);
	}
    render() {
		this.img.onload = function() {
			drawImg();
		}
        // ctx.fillStyle = 'rgb(255, 0, 0)';
		// ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	

}

// function make_base()
// {
//   base_image = new Image();
//   base_image.src = 'img/base.png';
//   base_image.onload = function(){
//     context.drawImage(base_image, base_image.width, base_image.height);
//   }
// }

var hydrant = new Hydrant(canvas.width - 30, canvas.height-65, 25, 45);
var dog = new Dog(70,canvas.height-55, 35, 35);

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGround();
	hydrant.render();
	dog.render();
	detectCollision();
	 if(hydrant.x < 0){
	 	hydrant.x = canvas.width + 10;
	 }
	if(spacePressed) {
		dog.y -= 5;
	}
	 if(dog.y < canvas.height-55) {
		 dog.y += GRAVITY;
	 }
	  hydrant.x -= speed;

	  ctx.font = "12px Arial";
	  ctx.fillStyle = "rgb(0,0,0)"
	  ctx.fillText(Math.floor(counter / 20),canvas.width - 30,15);
	  counter ++;
	  if(Math.floor(counter /(speed * 10)) > level) {

		  speed += 0.4;
		  console.log(speed);
		  level += 100;
	  }
}
var gameDraw = setInterval(draw, 10);

function detectCollision() {
	if(dog.x < hydrant.x + hydrant.width &&
	dog.x + dog.size > hydrant.x &&
	dog.y < hydrant.y + hydrant.height &&
	dog.size + dog.y > hydrant.y) {
		console.log('collision detected?')
		clearInterval(gameDraw);
		restartGame();
	}
}

function restartGame() {
	console.log('u lose')
	ctx.fillStyle = "rgb(0,0,0)"
	ctx.fillText("u lose. play again?",canvas.width / 2, canvas.height / 2);
}

//-----TO DO--------//
//Need a restart option
//sprites and animation added
//a way to speed up at different levels
//randomize how many hydrants and intervals
//make jump more smooth and realistic...
//possibly add another obstacle
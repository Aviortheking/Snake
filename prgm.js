var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var xS = canvas.width / 20;
var yS = canvas.height / 20;
var lastKey = null;
/*
Tableau avec x, y
xTotal = canvas.width/10;
yTotal = canvas.height/10;
 */

Game = {
	elements: [],
	food: null,
	snake: null,
	columns: 0,
	line: 0,
	init: function() {

		for (var i = 0; i < canvas.height; i+=20) {
			for(var t = 0; t < canvas.width; t+=20) {
					//console.log(t);
				var square = new Square();
				square.ctx = ctx;
				square.color = "red";
				square.width = xS;
				square.pos = [t, i];
				square.draw();
				this.elements[this.elements.length] = square;
			}
		}

		this.food = new Food();
		this.food.width = xS;
		this.food.ctx = ctx;
		this.food.pos = [randInt(0,xS-1)*20, randInt(0, yS-1)*20];
		console.log(this.food.pos);
		this.food.draw();

		var snake = new Snake();
		snake.ctx = ctx;
		snake.color = "white";
		snake.width = xS;
		snake.pos = [[0,0]];
		snake.draw();
		this.snake = snake;


		setInterval(this.update, 50);





	},
	update: function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height); // clear Canvas
		for (var t = 0; t < Game.elements.length; t++) {
			Game.elements[t].update();
		}
		//console.log(Game.snake.pos[Game.snake.pos.length-1] +", "+ Game.food.pos);
		if(Game.snake.pos[Game.snake.pos.length-1][0] ===Game.food.pos[0] && Game.snake.pos[Game.snake.pos.length-1][1] ===Game.food.pos[1]) {

			Game.snake.bigger();
			Game.food.new();
		}

		Game.food.update();
		Game.snake.update();
	}
};

window.addEventListener('keydown', function (e) {
	if(e.keyCode !== 82) {
		e.preventDefault();
		/*
		Right: 39 || 68
		Left: 37 || 81
		Up: 90 || 38
		Down: 83 || 40
		 */
		lastKey = e.keyCode;

	}
});

function Square() {
	this.width = 0;
	this.pos = [0,0];
	this.color = "blue";
	this.ctx = null;
	this.draw = function() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.pos[0], this.pos[1], this.width, this.width);
	};
	this.update = function() {
		this.ctx.clearRect(this.pos[0], this.pos[1], this.width, this.width);
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.pos[0], this.pos[1], this.width, this.width);
	};
}

function Snake() {
	this.width = 20;
	this.pos = [[0,0]];
	this.color = "orange";
	this.ctx = null;
	this.bigger= function() {
		this.pos.unshift([this.pos[0]]);
	};
	this.draw = function() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.pos[0][0], this.pos[0][1], this.width, this.width);
	};
	this.update = function() {
		//console.log(this.pos);
		//this.ctx.clearRect(this.pos[0], this.pos[1], this.width, this.width);
		this.ctx.fillStyle = this.color;
		var vert = 0;
		var hori = 0;
		if(lastKey === 90 || lastKey === 38 ) vert = -20;
		else if(lastKey === 39 || lastKey === 68) hori = 20;
		else if(lastKey === 83 || 40 === lastKey) vert = 20;
		else if(lastKey === 37 || 81 === lastKey) hori = -20;
		this.pos.push([this.pos[this.pos.length-1][0]+hori, this.pos[this.pos.length-1][1]+vert]);
		this.pos.shift();
		for(var t = 0; t < this.pos.length; t++) {
			var a = this.pos[t][0];
			var b = this.pos[t][1];

			this.ctx.fillRect(a, b, this.width, this.width);

			if(t > 1 && this.pos.length > 1 && a === this.pos[this.pos.length-1][0] && b === this.pos[this.pos.length-1][1]) {
				console.log((this.pos.length > 1) +", "+ (a === this.pos[this.pos.length-1][0]) +", "+ (b === this.pos[this.pos.length-1][1]));
				lastKey = 0;
				window.alert("Game Over!");
			}
		}
	};
}

function Food() {
	this.width = 0;
	this.pos = [0,0];
	this.color = "yellow";
	this.ctx = null;
	this.new = function() {
		this.pos = [randInt(0,xS-1)*20, randInt(0, yS-1)*20];
	};
	this.draw = function() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.pos[0], this.pos[1], this.width, this.width);
	};
	this.update = function() {
		this.ctx.clearRect(this.pos[0], this.pos[1], this.width, this.width);
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.pos[0], this.pos[1], this.width, this.width);
	};
}

function randInt(min, max) {
	return Math.floor((Math.random() * (max+1)) + min);
}
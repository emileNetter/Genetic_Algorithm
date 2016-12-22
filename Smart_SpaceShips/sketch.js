var spaceship_img;
var lifetime;
var target;
var genNumber = 1;
var gen;
var population;
var lifespan = 400;
var popsize = 50;
var count =0;
var maxforce =0.2;
var mutationRate =0.01;
var x;
var obswidth;
var y;
var obsheight;
var obstacles = [];

function preload(){
	spaceship_img= loadImage("Img/Spaceship.png");
}

function setup() {
	createCanvas(700,550);
	target =createVector(width/2,80);
	population = new Population();
	lifetime = createP();	
	gen = createP();
	
}

function draw() {
  	background(51);
	population.run();
	for (var i =0; i< obstacles.length; i++){
		obstacles[i].show();
	}

	lifetime.html("Lifetime : " + count);
	lifetime.position(width+10,50);

	count++;
	if (count == lifespan){
		population.rate();
		population.naturalSelection();
		count =0;		
		genNumber++;
	}
	gen.html("Generation Number : " + genNumber +  " **** \nMutation Rate : " + mutationRate *100 + "%");
	gen.position(width+10,20);

	// draw a nice target with 3 different colors
	noStroke();
  	fill(40,53,117);
  	ellipse(target.x,target.y,40,40);
  	fill(255,235,238);
  	ellipse(target.x,target.y,30,30);
  	fill(244,67,54);
  	ellipse(target.x,target.y,20,20);
 
}
function mousePressed(){
	obsx = mouseX;
	obsy = mouseY;
}

function mouseReleased(){
	obswidth = mouseX - obsx;
	obsheight = mouseY - obsy;	
	obstacles.push(new Obstacle(obsx,obsy,obswidth,obsheight));
}
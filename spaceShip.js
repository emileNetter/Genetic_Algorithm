function Spaceship (dna) {

	this.pos = createVector(width/2,height);
	this.vel = createVector();
	this.acc = createVector();
	this.isCompleted =false;
	this.isCrashed = false;
	this.fitness =0;

	if(dna){
		this.dna = dna;
	} else {
		this.dna = new DNA();
	}
	
	this.applyForce = function(force){
		this.acc.add(force);
	}

	this.update = function(){
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		if(d < 25){
			this.isCompleted = true;
			this.pos =target.copy();
		}

		for (var i = obstacles.length - 1; i >= 0; i--) {
			if(this.pos.x > obstacles[i].x && this.pos.x <obstacles[i].x + obstacles[i].owidth && this.pos.y > obstacles[i].y && this.pos.y < obstacles[i].y + obstacles[i].oheight){
				this.isCrashed = true;
			}
		}

		if(this.pos.x<0 || this.pos.x > width){
			this.isCrashed = true;
		}

		this.applyForce(this.dna.genes[count]);
		if(!this.isCompleted && !this.isCrashed){
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
		}				
	}

	this.show = function(){
		push();
		translate(this.pos.x,this.pos.y);
		rotate(this.vel.heading() + PI/2);
		imageMode(CENTER);	
		image(spaceship_img,0,0);	
		pop();
	}
	//calculate fitness depending on the distance between the spaceship and the target
	this.calcFitness = function(){
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		this.fitness = map(d,0,width,width,0);
		if(this.isCompleted){
			this.fitness *= 10;
		}

		if(this.isCrashed){
			this.fitness *= 0.1;
		}
	}	
}
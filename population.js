function Population(){
	this.spaceships = [];	
	this.matingpool = [];
	this.meanfit =0;
	this.sumfit =0;

	for (var i =0; i<popsize; i++){
		this.spaceships[i] = new Spaceship();	
	}

	this.run = function(){
		for (var i =0; i<popsize; i++){
			this.spaceships[i].update();
			this.spaceships[i].show();
		}

	}

	//The mating pool is filled depending on the fitness of each spaceship 
	//(the higher the fitness the higher chance of getting this spaceship picked)
	this.rate = function(){
		var maxfit =0;
		var sumfit =0;
		for (var i =0; i<popsize; i++){
			this.spaceships[i].calcFitness();
			if(this.spaceships[i].fitness >maxfit){
				maxfit = this.spaceships[i].fitness;
			}
		}
		for (var i =0; i<popsize; i++){
			this.spaceships[i].fitness /= maxfit;		
			sumfit += this.spaceships[i].fitness / maxfit;
		}
		this.meanfit = sumfit / popsize;
		this.matingpool =[];

		for (var i =0; i<popsize; i++){
			var n = this.spaceships[i].fitness * 100;
			for(var j =0; j<n; j++){
				this.matingpool.push(this.spaceships[i]);
			}	
		}

	}

	// Choose 2 random parents(spaceships) and create a new child with their DNA
	this.naturalSelection = function(){
		var newspaceships = [];
		for (var i = 0; i < this.spaceships.length; i++){
			var parentA = random(this.matingpool).dna;
			var parentB = random(this.matingpool).dna;
			var child = parentA.crossover(parentB);
			child.mutation();
			newspaceships[i] = new Spaceship(child);
		}
		this.spaceships = newspaceships;
	}		
}
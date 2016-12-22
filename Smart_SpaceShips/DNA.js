function DNA (genes){
	if(genes){
		this.genes = genes;
	} else {
		this.genes =[];
		for(var i =0; i<lifespan; i++){
			this.genes[i] = p5.Vector.random2D();
			this.genes[i].setMag(maxforce);
		}
	}	
	// mix the DNA of 2 parents and returns a DNA with new genes
	this.crossover = function(partner){
		var newgenes = [];
		var middle = floor(random(this.genes.length));
		for(var i=0; i<this.genes.length; i++){			
			if(i<middle){
				newgenes[i]=this.genes[i];
			}else{
				newgenes[i]= partner.genes[i];
			}			
		}
		return new DNA(newgenes);
	}

	// randomly mutate child genes
	this.mutation = function(){
		for(var i=0; i<this.genes.length; i++){
			if(random(1) < mutationRate){
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(maxforce);
			}
		}
	}
}
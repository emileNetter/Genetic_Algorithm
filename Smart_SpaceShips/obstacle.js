function Obstacle(x,y,owidth,oheight){
	this.x = x;
	this.owidth = owidth;
	this.y = y;
	this.oheight = oheight;

	this.show = function(){
		fill(230);
		noStroke();
		rect(this.x,this.y,this.owidth,this.oheight);
	}
}
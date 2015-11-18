var listBranches = [];

// --------------------------------------------
function setup()
{
  	createCanvas(displayWidth, displayHeight);
}

// --------------------------------------------
function draw()
{
	background(0); //inversion branche blanche sur fond noir
	for (var i=listBranches.length-1;i>=0;i--)
	{
		listBranches[i].grow();
		listBranches[i].draw();
		if (listBranches[i].age==0) listBranches.splice(i,1);
	}
	text(listBranches.length, 4,12);
}

// --------------------------------------------
function mousePressed()
{
	var newBranche = new Branche( mouseY ); // sera remplacé par msg
	listBranches.push( newBranche );

}


// --------------------------------------------
function Branche(yin_)
{
	this.points = [];
	this.x = 0;
	this.xoffset = random(2);
	this.yin = yin_;

	this.age = 100;
	this.arrived = false;
	this.xspeed = random(10,50);

  

	this.grow = function()
	{
		if (this.x <= width)
		{
			if (this.points.length == 0 ){

      var y = this.yin;
			this.points.push( {x : this.x, y : y} ); }

      else { var y = this.yin + 150*(2*noise( 0.01*this.x + this.xoffset )-1) ; //noise par rapport à Y
        console.log(noise( 0.01*this.x + this.xoffset ));
			this.points.push( {x : this.x, y : y} ); }

			this.x += this.xspeed;
		}
		else
		{
			this.arrived = true;
		}

		if (this.arrived)
		{
			this.age -=1;
			if (this.age<0)
				this.age = 0;

		}
	}

	this.draw = function()
	{
		stroke(255, map(this.age,100,0,255,0));
		for (var i=0 ; i<this.points.length-1; i++)
		{
			line( this.points[i].x, this.points[i].y, this.points[i+1].x, this.points[i+1].y);
		}
	}

}

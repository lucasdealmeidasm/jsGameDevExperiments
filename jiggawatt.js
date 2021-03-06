dataSrcs.push("gfx/jiggawattOfficial.jpg");

function Jiggawatt()
{
	this.x = this.y = 0;
	this.width = this.height = 75;
	this.image = data["gfx/jiggawattOfficial.jpg"];
	this.speed = 5 * 60;
	this.health = 100;
	this.alive = true;
	
	this.Draw = ImageDraw;
}

Jiggawatt.prototype = new Player();

Jiggawatt.prototype.Update = function (dt)
{
	var dx = 0, dy = 0;
	if(keys["keyLeft"].state != 0) dx = -1;
	if(keys["keyRight"].state != 0) dx = 1;
	if(keys["keyUp"].state != 0) dy = -1;
	if(keys["keyDown"].state != 0) dy = 1;
	var dl = Math.sqrt((dx * dx) + (dy * dy));
	if(dl != 0)
	{
		dx *= this.speed / dl;
		dy *= this.speed / dl;
	}
	
	this.x += dx * dt;
	this.y += dy * dt;
	AvoidSolids(this);
	
	if(this.health <= 0) this.alive = false;

	CameraFocusOn(this);
}
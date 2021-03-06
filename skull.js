dataSrcs.push("gfx/fireball.png");
dataSrcs.push("gfx/skull.png");

function SkullProjectile()
{
	this.width = this.height = 8;
	
	this.image = data["gfx/fireball.png"];
	this.frameWidth = 20;
	this.animLength = 10;
	this.iAnimSpeed = 3 / 60;
	this.Draw = SpriteDraw2;
	
	this.targetHit = Player.prototype.Hit;
	this.damage = 10;
	
	this.lifeTime = 5.25;
}

SkullProjectile.prototype = new Projectile();

function Skull()
{
	this.y = 300 - (Math.random() * 600);
	this.x = 300 - (Math.random() * 600);
	this.width = 70;
	this.height = 105;
	this.image = data["gfx/skull.png"];
	
	this.Draw = ImageDraw;
	
	this.target = false;
	this.shootAtX = this.shootAtY = 0;
	this.counter1 = this.counter2 = 0;
	this.shootSpeed = 7 * 60;
}

Skull.prototype = new Enemy();

Skull.prototype.Update = function(dt)
{
	this.counter1 += dt;
	if(this.counter1 >= 0.5)
	{
		this.counter2 += dt;
		if(this.counter2 >= 0.1)
		{
			var dx = this.shootAtX - (this.x - 21);
			var dy = this.shootAtY - (this.y - 10);
			var dl = Math.sqrt((dx * dx) + (dy * dy));
			dx *= this.shootSpeed / dl;
			dy *= this.shootSpeed / dl;
			var p = new SkullProjectile();
			p.x = this.x - 21;
			p.y = this.y - 10;
			p.dx = dx;
			p.dy = dy;
			AddEntity(p);
			dx = this.shootAtX - (this.x + 21);
			dy = this.shootAtY - (this.y - 10);
			dl = Math.sqrt((dx * dx) + (dy * dy));
			dx *= this.shootSpeed / dl;
			dy *= this.shootSpeed / dl;
			p = new SkullProjectile();
			p.x = this.x + 21;
			p.y = this.y - 10;
			p.dx = dx;
			p.dy = dy;
			AddEntity(p);
			this.counter2 = 0;
			if(this.counter1 >= 0.8)
			{
				this.counter1 = this.counter2 = 0;
			}
		}
	}
	else
	{
		if(this.target)
		{
			this.shootAtX = this.target.x;
			this.shootAtY = this.target.y;
		}
		else
		{
			this.counter1 = 0;
			this.counter2 = 0;
		}
	}
	
	if(!this.target)
	{
		for(var i = 0; i < entities.length; i++)
		{
			if(!ExistentAndAlive(entities[i])) continue;
			if(entities[i] == this) continue;
			if(IsVisibleTo(this, entities[i]))
			{
				if(entities[i].Hit == Player.prototype.Hit)
				{
					this.target = entities[i];
				}
			}
		}
	}
	if(!IsVisibleTo(this, this.target)) this.target = false;
}
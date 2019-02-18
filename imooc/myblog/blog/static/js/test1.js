// JavaScript Document
var snow = {
	speedy:5,
	speedx:0.5,
	}
	
function Snows(left)
{
	this.left = left;
	this.top = Math.random()*10;
	this.width = Math.random()*5+10;
	this.height = Math.random()*30+10;
	
	
	var div = document.createElement("div");
	div.style.position = "absolute";
	div.innerHTML = "❃";
	div.style.fontSize = this.width+"px"
	div.style.color ="#FFF";
	document.getElementById("snowb").appendChild(div);
	this.UI = div
	
}
Snows.prototype.falldown = function()
	{
		this.left = this.left + snow.speedx;
		
		if (this.left >=1450)
			{
				$(this.UI).remove()
			};
		if(this.top >= 650)
			{
				$(this.UI).remove()
			};
		this.top = this.top + snow.speedy;
		this.upUI();
		var that = this;
		setTimeout(function()
					{
						that.falldown()
					},100);
		
	}
Snows.prototype.removeres = function()
	{
		
		$(this).remove()
	}
Snows.prototype.upUI = function()
	{
		this.UI.style.left = this.left + "px";
		this.UI.style.top  =  this.top + "px";
		
	}


	function star()
	{		
		for(i=Math.random()*100;i<1510;i+=Math.random()*100+100)
		{	
			snow1 = new Snows(i)
			snow1.falldown()
		}
	}
setInterval(function()
				{
					star()
				},2000)
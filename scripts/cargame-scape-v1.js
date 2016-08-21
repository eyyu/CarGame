/*CAR GAME VERSION 1.0 - Eva Yu - AUG/01/2016 
 *
 *Author: Eva Yu
 *Version : 1.0
 *Description: this game is a simple cargame that was 
 * once a mere fragment of the imagination of someone
 * that means everything to me. 
 *
 * its really not too hard to figure out how to play it. 
 * 1) press on the signpost to draw a line 
 * 2) the line needs to retract before it hits the wheel of the car
 *
 * the closer the line gets to the car, the mor points there are 
 */
// speed is determined as Px/Frame
// average of 3 lines / second

// global constants 
/*
var VIEWERSHIP_CONST; //  RELATIVE_VIEW_CONST;? // NOTE: come up with equation that determines the constant   
var SPEED_CONST = 60; // km / hr 
var LINE_PASSES_PER_SEC = 16.7; // traffic lines passed per second at 60km/h
var TRAFFIC_LINE_LENGTH = 3; // meters
*/


//global variables  
var canvas, ctx; 
var WIDTH = 990;
var HEIGHT = 680;
var X_CONST = 455.0;
var Y_CONST = -317.0;

$(document).ready(function()
{
	canvas = $("canvas")[0]; // assign canvas DOM element
	//check for browswer support 
	if( canvas != null && canvas.getContext )
	{ 
		ctx = canvas.getContext("2d");
		drawboard(null,startgame());
	} 
	else 
	{
		$("#game-board-incompatible-message").text("Your Browser does not support the HTML Canvas Element. Please try another Browser or update your existing browser.");
	}
});



function drawboard(start, callback) {

	var K1, a1; // stores constant and slope of Line 1
	var CONST_LINE_1 = new line(615.0,-357.0,813.0,-532.0);
	a1 = CONST_LINE_1.getSlope();

	//TO DELETE: FOR TESTSING ONLY!!
	console.log("A1: "+ a1 );
	K1 = a1 * (CONST_LINE_1.x1 - X_CONST);

	//TO DELETE: FOR TESTSING ONLY!!
	console.log("K1: "+ K1 );

	/*********************************************/
	/* 			DRAWING THE 3-D SCAPE			 */
	/*********************************************/
	
	for (var i = 0, x_current = 10; x_current < WIDTH ; ++i, x_current += 10) { // x_current < WIDTH)
		var a_temp;
		//First Two points of the line are X = x_current and Y = Y_CONST
		var temp_line = new line(x_current, Y_CONST, undefined,  undefined);
		
		//set values to be used for this loop
		//use K1 , and K2 to determine slope
		a_temp = temp_line.getSlopeWithK(K1, K2);
		
		//use slope to determine the end points
		if(temp_line.x1 < X_CONST){
			temp_line.x2 = 0;
			temp_line.y2 = temp_line.getYwithSlope(a_temp, temp_line.x2);			
		}else{
			temp_line.x2 = WIDTH;
			temp_line.y2 = temp_line.getYwithSlope(a_temp, temp_line.x2);
		}
		
		// if line goes off the edges,  
		if(temp_line.y2 <  -HEIGHT ){
			temp_line.y2 = -HEIGHT;
			temp_line.x2 = temp_line.getXwithSlope(a_temp, temp_line.y2);
		}
	
		ctx.moveTo(temp_line.x1, - temp_line.y1 );
		ctx.lineTo(temp_line.x2, - temp_line.y2 );
		ctx.stroke();
	}

	//ctx.fill();
	//OPTIONAL - draw dice / ornament
	//draw arc for wheel
	//draw car frame
	//draw headboard / dashboard
	//draw mirror
	callback && callback;
}

function startgame()
{
	
	//FOLLOWING IS FOR SCRIPT TESTING!
	$("h1").click(function(){
        $(this).hide();
    });

	$("#game-board-block").click(function(){
        $("h1").show();
    });
    /*********************************/

};

//SIGN POST OBEJCT
function signpost(upperLX, upperLY, signW, signH, H, spdOfLn) 
{
    this.signX = upperLX;
    this.signY = upperLY;
    this.signWidth = signW;
    this.signHeight = signH;
    this.postHeight = H;
    ths.speedofLine = spdOfLn;
}
//FUNCTION OF SIGPOST OBJECT TO REDRAW SIGNPOST IN CANVAS
signpost.prototype.redraw = function(speed)
{
	redraw(this, speed);
	//redraw according to speed
}

signpost.prototype.drawline = function(speed){
	++ this.lineLen;
	//draw added pix to the line again;
	this.redraw();
}

//TRAFFIC LINE OBJECT
function trafficline(upperLX, upperLY, trafficlineW, trafficlineL)
{
    this.trafficlineX = upperLX;
    this.trafficlineY = upperLY;
    this.trafficlineWidth = trafficlineW; // NOTE: growing
    this.trafficlineLength = trafficlineL; // NOTE: gorwing
}
//FUNCTION OF SIGPOST OBJECT TO REDRAW TRAFFICLINE IN CANVAS
trafficline.prototype.redraw = function(speed)
{
	redraw(this, speed);	
	//redraw according to speed
}

function redraw(obj, speed){
	//clear canvas
	canvas.clear();
	//take the image inside canvas and redraw 
	//do you ne a global variable that defines the angle ( aka perspective ?)
	//
} 

function line(X1, Y1, X2, Y2){
	this.x1 = X1;
	this.y1 = Y1;
	this.x2 = X2;
	this.y2 = Y2;
}

line.prototype.getSlope = function()
{
	return ( (this.y2 - this.y1) / (this.x2 - this.x1) );	
}

line.prototype.getSlopeWithK = function(k1, k2)
{
	// return (k1 / ( this.x1 - X_CONST ) ) + ( k2 * ( this.y1 - Y_CONST ) );
	return 	k1 / ( this.x1 - X_CONST ) ;
}

line.prototype.getXwithSlope = function(slope, y)
{
	return (y - this.y1) / slope + this.x1; 
}

line.prototype.getYwithSlope = function(slope, x)
{
	return this.y1 + (slope * ( x  - this.x1));
}